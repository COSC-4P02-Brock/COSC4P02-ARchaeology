import { array, number, object, string } from "yup";
import { supabase } from "../utils.server";
import { SupabaseContext } from "../utils.server";

const usersSchema = array().of(object({
  id: string().required(),
  aud: string().nullable(),
  email: string().nullable(),
  email_confirmed_at: string().nullable(),
  phone: string().nullable(),
  confirmed_at: string().nullable(),
  last_sign_in_at: string().nullable(),
}));

export class UserService {
  constructor(private context: SupabaseContext) {
    this.context = context;
  }

  async getUsers() {
    const { data: { users: rawUsers }, error } = await supabase(this.context)
      .auth
      .admin
      .listUsers()

    const users = await usersSchema.validate(rawUsers);
    return { users: (users ?? []).map(user => ({
        id: user.id,
        aud: user.aud ?? '',
        email: user.email ?? '',
        emailConfirmedAt: user.email_confirmed_at ?? '',
        phone: user.phone ?? '',
        confirmed: Boolean(user.confirmed_at),
        lastSignInAt: user.last_sign_in_at ?? '',
      })), error }
  }
}

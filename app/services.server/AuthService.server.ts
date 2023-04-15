import { number, object, string } from "yup";

import { supabase } from "../utils.server";
import type { SupabaseContext } from "../utils.server";

const signInResponseSchema = object({
  session: object({
    access_token: string().required(),
    expires_in: number().required(),
    expires_at: string().required(),
  }),
})

export class AuthError extends Error {}

export class AuthService {
  constructor(private context: SupabaseContext) {
    this.context = context;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase(this.context).auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new AuthError("Invalid email or password"); 
    }

    const signInResponse = await signInResponseSchema.validate(data);

    return {
      token: signInResponse.session.access_token,
      expiresAt: signInResponse.session.expires_at,
      expiresIn: signInResponse.session.expires_in,
    }
  }
}

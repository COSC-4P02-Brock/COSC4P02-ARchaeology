import { number, object, string } from "yup";

import { supabase } from "../utils.server";
import type { SupabaseContext } from "../utils.server";

/**
 * The shape of the data returned from the supabase API when signing in.
 */
const signInResponseSchema = object({
  session: object({
    access_token: string().required(),
    expires_in: number().required(),
    expires_at: string().required(),
  }),
})

/**
 * Error thrown when authentication fails.
 */
export class AuthError extends Error {}

/**
 * Service for working with authentication.
 */
export class AuthService {
  /**
   * Create a new instance of the service. The context is used to instantiate
   * supabase with the correct configuration.
   */
  constructor(private context: SupabaseContext) {
    this.context = context;
  }

  /**
   * Sign in with an email and password to receive an access token.
   */
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
      email,
      token: signInResponse.session.access_token,
      expiresAt: signInResponse.session.expires_at,
      expiresIn: signInResponse.session.expires_in,
    }
  }
}

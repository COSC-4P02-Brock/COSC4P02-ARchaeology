import { array, number, object, string } from "yup";

import { supabase } from "../utils.server";
import type { SupabaseContext } from "../utils.server";

/**
 * The shape of the payload for creating or updating an artifact.
 */
type ArtifactPayload = {
  name: string;
  objectId: string;
  date: string;
  dimensions: string;
  description: string;
};

/**
 * The shape of the data returned from the supabase API when fetching artifacts.
 */
const artifactsSchema = array().of(object({
  id: number().required(),
  name: string().required(),
  object_id: string().required(),
}));

/**
 * The shape of the data returned from the supabase API when fetching an
 * artifact.
 */
const artifactSchema = object({
  id: number().required(),
  name: string().required(),
  date: string().required(),
  description: string().required(),
  dimensions: string().required(),
  object_id: string().required(),
  artifact_images: array().of(object({
    id: number().required(),
    caption: string().required(),
    url: string().required(),
  })).required(),
  likes: object({
    count: number().optional(),
  }).nullable(),
})

/**
 * Service for interacting with artifacts.
 */
export class ArtifactService {
  constructor(private context: SupabaseContext) {
    this.context = context;
  }

  /**
   * Get all artifacts.
   */
  async getArtifacts() {
    const { data } = await supabase(this.context)
      .from("artifacts")
      .select(`
        id,
        name,
        object_id
      `)
      .order("name", { ascending: true });

    const artifacts = await artifactsSchema.validate(data);
    if (!artifacts) {
      return [];
    }
    return artifacts.map(({ id, name, object_id }) => ({
      id,
      name,
      objectId: object_id,
    }));
  }

  /**
   * Get an artifact by id.
   */
  async getArtifact(id: number | string) {
    const { data } = await supabase(this.context)
      .from("artifacts")
      .select(`
        id,
        name,
        date,
        description,
        dimensions,
        object_id,
        artifact_images (id, caption, url),
        likes (count)
      `)
      .eq("id", id)
      .limit(1)
      .single();

    const artifact = await artifactSchema.validate(data);
    return {
      id: artifact.id,
      name: artifact.name,
      date: artifact.date,
      description: artifact.description,
      dimensions: artifact.dimensions,
      objectId: artifact.object_id,
      images: artifact.artifact_images.map((image) => ({
        id: image.id,
        caption: image.caption,
        url: image.url,
      })),
      likeCount: artifact.likes?.count ?? 0,
    };
  }

  /**
   * Likes an artifact by id.
   */
  async likeArtifact(id: number | string) {
    const { data, error } = await supabase(this.context).rpc("like_artifact", {
      artifact_id_to_check: parseInt(id as string, 10),
    });
    return { data, error };
  }

  /**
   * Updates an artifact by id. Requires a valid access token.
   */
  async updateArtifact(
    id: number | string,
    {
      name,
      objectId,
      date,
      dimensions,
      description,
    }: ArtifactPayload,
    token: string
  ) {
    const { data, error } = await supabase(this.context, token)
      .from("artifacts")
      .update({
        name,
        object_id: objectId,
        date,
        dimensions,
        description,
      })
      .eq("id", id)
    return { data, error };
  }

  /**
   * Create an artifact. Requires a valid access token.
   */
  async createArtifact(
    {
      name,
      objectId,
      date,
      dimensions,
      description
    }: ArtifactPayload,
    token: string
  ) {
    const { data, error } = await supabase(this.context, token)
      .from("artifacts")
      .insert({
        name,
        object_id: objectId,
        date,
        dimensions,
        description,
      });
    return { data, error };
  }
}

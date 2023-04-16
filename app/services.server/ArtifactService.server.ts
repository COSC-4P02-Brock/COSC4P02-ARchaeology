import { array, number, object, string } from "yup";

import { supabase } from "../utils.server";
import type { SupabaseContext } from "../utils.server";

type ArtifactPayload = {
  name: string;
  objectId: string;
  dimensions: string;
  description: string;
};

const artifactsSchema = array().of(object({
  id: number().required(),
  name: string().required(),
  object_id: string().required(),
}));

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
    count: number().required(),
  }),
})

export class ArtifactService {
  constructor(private context: SupabaseContext) {
    this.context = context;
  }

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
      likeCount: artifact.likes.count,
    };
  }

  async likeArtifact(id: number | string) {
    console.log('likeArtifact', id);
    const { data, error } = await supabase(this.context).rpc("like_artifact", {
      artifact_id_to_check: parseInt(id as string, 10),
    });
    return { data, error };
  }

  async updateArtifact(
    id: number | string,
    {
      name,
      objectId,
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
        dimensions,
        description,
      })
      .eq("id", id)
    return { data, error };
  }

  async createArtifact(
    {
      name,
      objectId,
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
        dimensions,
        description,
      });
    return { data, error };
  }
}

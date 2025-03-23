import { api } from "@/lib/axios";

interface UpdateProfileRequest {
  name: string
  description: string | null
}

export async function updateProfile({ description, name }: UpdateProfileRequest) {
  await api.put('/profile', { name, description })
}
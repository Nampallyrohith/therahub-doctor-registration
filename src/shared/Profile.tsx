import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/supabase/connection";
import { useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  const uploadAvatar = async () => {
    if (file) {
      const filePath = `doctors/1/${file.name}`;
      const { error } = await supabaseClient.storage
        .from("doc_avatars")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (error) {
        toast("Upload failed");
        return;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabaseClient.storage.from("doc_avatars").getPublicUrl(filePath);
      setAvatar(publicUrl);

      console.log("public url:", publicUrl)

      // Update database
      //   await supabaseClient.from("doctors").update({ avatar_url: publicUrl }).eq("id", doctorId);

      toast("Avatar updated");
    }
  };
  return (
    <div>
      <img src={avatar} />
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      <Button type="button" onClick={uploadAvatar}>
        Upload Avatar
      </Button>
    </div>
  );
};

export default Profile;

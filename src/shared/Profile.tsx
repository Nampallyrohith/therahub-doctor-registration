//import { Button } from "@/components/ui/button";
//import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/supabase/connection";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaPen } from "react-icons/fa";

const Profile = () => {
  type User = {
    name: string;
    email: string;
    gender: string;
    phone: string;
    age: string;
    qualification: string;
    about: string;
    specialist: string;
    experience: string;
    therapyId: string;
    avatarUrl?: string;
  };

  const Qualifications = [
    "Bachelor’s Degree in Psychology",
    "Master’s Degree in Psychology",
    "Doctor of Psychology",
    "Doctor of Philosophy in Psychology",
  ];
  const TherapistID = [
    "Psychodynamic Therapy",
    "Behavioral Therapy",
    "Coginative Behavioral Therapy",
    "Humanistic Therapy",
  ];
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string>(
    "https://via.placeholder.com/100"
  );
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState<User>({
    name: "John Doe",
    email: "john.doe@example.com",
    gender: "Male",
    phone: "1234567890",
    age: "29",
    qualification: "Master’s Degree in Psychology",
    specialist: "Cardiologist",
    experience: "5 Years",
    about: "I am a cardiologist with 5 years of experience.",
    therapyId: "Psychodynamic Therapy",
    avatarUrl: "https://via.placeholder.com/100",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<User>();

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  const onSubmit = (data: User) => {
    setUser(data);
    setIsEditing(false);
    toast.success("Profile updated", {
      duration: 3000,
      style: {
        backgroundColor: "#1f5d5d",
        color: "#fff",
        fontWeight: 700,
      },
    });
  };

  const handleCancel = () => {
    reset(user);
    setIsEditing(false);
  };

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
      const { data } = supabaseClient.storage
        .from("doc_avatars")
        .getPublicUrl(filePath);
      setAvatar(data.publicUrl);
      toast("Avatar updated");
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-[#CBF6EF] rounded-2xl mx-3 space-y-4 p-6 shadow-lg w-11/12 text-sm md:w-[900px]"
      >
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full"
          >
            <FaPen className="text-gray-700" />
          </button>
        )}

        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <img
              src={avatar}
              className="w-24 h-24 rounded-full object-cover bg-gray-100"
              alt="Profile"
            />
            {isEditing && (
              <label
                htmlFor="fileInput"
                className="absolute -bottom-1 right-1 w-8 h-8 bg-white p-2 rounded-full text-gray-700 shadow border border-gray-300 flex items-center justify-center cursor-pointer"
              >
                <FaPen className="w-4 h-4" />
              </label>
            )}
          </div>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          <div className="flex gap-2">
            <label className="text-[#FF9F1C]">Name:</label>
            {isEditing ? (
              <input
                {...register("name", {
                  required: "Name is required",
                })}
                className="border-b-2 border-[#2EC4B6] text-[#2EC4B6]"
              />
            ) : (
              <p className="text-[#2EC4B6]">{watch("name") || user.name}</p>
            )}
          </div>

          <div className="flex gap-2">
            <label className="text-[#FF9F1C]">Qualification:</label>
            {isEditing ? (
              <select
                {...register("qualification", {
                  required: "Qualification is required",
                })}
                className="border-b-2 border-[#2EC4B6] text-[#2EC4B6] "
              >
                <option value="">Select a qualification</option>
                {Qualifications.map((qualification, index) => (
                  <option key={index} value={qualification}>
                    {qualification}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-[#2EC4B6]">
                {watch("qualification") || user.qualification}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <label className="text-[#FF9F1C]">Email:</label>
            <p className="text-[#2EC4B6]">{watch("email") || user.email}</p>
          </div>

          <div className="flex gap-2">
            <label className="text-[#FF9F1C]">Specialist In:</label>
            {isEditing ? (
              <input
                {...register("specialist", {
                  required: "Specialist is required",
                })}
                className="border-b-2 border-[#2EC4B6] text-[#2EC4B6]"
              />
            ) : (
              <p className="text-[#2EC4B6]">
                {watch("specialist") || user.specialist}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <label className="text-[#FF9F1C]">Gender:</label>
            {isEditing ? (
              <select
                {...register("gender", { required: "Gender is required" })}
                className="border-b-2 border-[#2EC4B6] text-[#2EC4B6]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-[#2EC4B6]">{watch("gender") || user.gender}</p>
            )}
          </div>

          <div className="flex gap-2">
            <label className="text-[#FF9F1C]">Therapy ID:</label>
            {isEditing ? (
              <select
                {...register("therapyId", {
                  required: "Therapy ID is required",
                })}
                className="border-b-2 border-[#2EC4B6] text-[#2EC4B6]"
              >
                <option value="">Select a Therapy ID</option>
                {TherapistID.map((id, index) => (
                  <option key={index} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-[#2EC4B6]">
                {watch("therapyId") || user.therapyId}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <label className="text-[#FF9F1C]">Age:</label>
            {isEditing ? (
              <input
                {...register("age", {
                  required: "Age is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Age must be a number",
                  },
                })}
                className="bg-transparent border-0 border-b-[#2EC4B6] focus:border-b-green-primary-1 focus:ring-0  border-b-2 text-[#2EC4B6]"
                type="text"
              />
            ) : (
              <p className="text-[#2EC4B6]">{watch("age") || user.age}</p>
            )}
            {errors.age && (
              <p className="text-red-500 text-xs">{errors.age.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <label className="text-[#FF9F1C]">Experience:</label>
            {isEditing ? (
              <input
                {...register("experience", {
                  required: "Experience is required",
                })}
                className="border-b-2 border-[#2EC4B6] text-[#2EC4B6]"
              />
            ) : (
              <p className="text-[#2EC4B6]">
                {watch("experience") || user.experience}
              </p>
            )}
          </div>
          <div className="flex pt-5 gap-2">
            <label className="text-[#FF9F1C]">About Me:</label>
            {isEditing ? (
              <textarea
                {...register("about", { required: "About is required" })}
                className="w-full bg-transparent border-0 border-b-[#2EC4B6] focus:border-b-[#2EC4B6] focus:ring-0  border-b-2 text-[#2EC4B6] h-auto"
              />
            ) : (
              <p className="text-[#2EC4B6]">{watch("about") || user.about}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-4 justify-end my-2 pt-5">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-teal-600 border-2 border-teal-600 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md"
              onClick={uploadAvatar}
            >
              Save
            </button>
          </div>
        )}
        {isEditing && (
          <p className="italic text-green-700 text-xs">
            *Note: Name and email cannot be changed.
          </p>
        )}
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Profile;

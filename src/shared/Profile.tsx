import { Doctor, DoctorProfile } from "@/modals/typeDefinitions";
import { supabaseClient } from "@/supabase/connection";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FaPen } from "react-icons/fa";
import { ThreeDot } from "react-loading-indicators";

interface profileProps {
  onSubmitProfile: (data: Doctor) => void;
  doctor: DoctorProfile | undefined;
  loading: boolean;
  doctorId: string;
}

const Profile: React.FC<profileProps> = ({
  onSubmitProfile,
  loading,
  doctor,
  doctorId,
}) => {
  const Qualifications = [
    "Bachelor’s Degree in Psychology",
    "Master’s Degree in Psychology",
    "Doctor of Psychology",
    "Doctor of Philosophy in Psychology",
  ];
  const TherapistID = [
    "physodynamic",
    "behavioral",
    "cognitiveBehavioural",
    "humanistic",
  ];
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<Doctor>();
  useEffect(() => {
    if (doctor) {
      reset(doctor);
    }
  }, [doctor, reset]);

  const onSubmit = async (data: Doctor) => {
    console.log(data);

    if (file) {
      const newAvatarUrl = await uploadAvatar();
      if (newAvatarUrl) {
        data.avatarUrl = newAvatarUrl;
      }
    }

    setIsEditing(false);
    onSubmitProfile(data);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const uploadAvatar = async (): Promise<string | null> => {
    if (!file) return null;

    const filePath = `doctors/${doctorId}/${file.name}`;
    const { error } = await supabaseClient.storage
      .from("doc_avatars")
      .upload(filePath, file, { cacheControl: "3600", upsert: true });

    if (error) {
      toast("Upload failed");
      return null;
    }

    // Get public URL
    const { data } = supabaseClient.storage
      .from("doc_avatars")
      .getPublicUrl(filePath);
    setValue("avatarUrl", data.publicUrl);
    return data.publicUrl; // ✅ Return URL
  };

  return (
    <div className="w-full mx-auto lg:w-[72%] p-5 rounded-xl !mt-36  ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-[#CBF6EF] rounded-2xl mx-3 p-6 shadow-inset"
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
              src={watch("avatarUrl")}
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
            {...register("avatarUrl")}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {errors.avatarUrl && (
            <p className="text-red-500 text-xs">{errors.avatarUrl.message}</p>
          )}
        </div>
        <div
          className={`grid grid-cols-1 ${
            isEditing ? " xl:grid-cols-2" : " md:grid-cols-1 xl:grid-cols-2"
          } gap-4 !my-5 `}
        >
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <label className="text-[#FF9F1C]">Name:</label>
            {isEditing ? (
              <input
                {...register("name", {
                  required: "Name is required",
                })}
                className="border-b-2 outline-none border-[#2EC4B6] text-[#2EC4B6]"
              />
            ) : (
              <p className="text-[#2EC4B6]">{watch("name")}</p>
            )}
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col md:flex-row  gap-2 w-full">
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
              <p className="text-[#2EC4B6]">{watch("qualification")}</p>
            )}
            {errors.qualification && (
              <p className="text-red-500 text-xs">
                {errors.qualification.message}
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row  gap-2 w-full">
            <label className="text-[#FF9F1C]">Email:</label>
            <p className="text-[#2EC4B6]">{watch("email")}</p>
          </div>

          <div className="flex flex-col md:flex-row  gap-2 w-full">
            <label className="text-[#FF9F1C]">Specialist In:</label>
            {isEditing ? (
              <input
                {...register("specialistIn", {
                  required: "Specialist is required",
                })}
                className="border-b-2 outline-none border-[#2EC4B6] text-[#2EC4B6]"
              />
            ) : (
              <p className="text-[#2EC4B6]">{watch("specialistIn")}</p>
            )}
            {errors.specialistIn && (
              <p className="text-red-500 text-xs">
                {errors.specialistIn.message}
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row  gap-2 w-full">
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
              <p className="text-[#2EC4B6]">{watch("gender")}</p>
            )}
            {errors.gender && (
              <p className="text-red-500 text-xs">{errors.gender.message}</p>
            )}
          </div>

          <div className="flex flex-col md:flex-row  gap-2 w-full">
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
              <p className="text-[#2EC4B6]">{watch("therapyId")}</p>
            )}
            {errors.therapyId && (
              <p className="text-red-500 text-xs">{errors.therapyId.message}</p>
            )}
          </div>

          <div className="flex flex-col md:flex-row  gap-2 w-full">
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
                className="bg-transparent outline-none border-0 border-b-[#2EC4B6] focus:border-b-green-primary-1 focus:ring-0  border-b-2 text-[#2EC4B6]"
                type="text"
              />
            ) : (
              <p className="text-[#2EC4B6]">{watch("age")}</p>
            )}
            {errors.age && (
              <p className="text-red-500 text-xs">{errors.age.message}</p>
            )}
          </div>

          <div className="flex flex-col md:flex-row  gap-2 w-full">
            <label className="text-[#FF9F1C]">Experience:</label>
            {isEditing ? (
              <input
                type="text"
                {...register("experience", {
                  required: "Experience is required",
                })}
                className="border-b-2 outline-none border-[#2EC4B6] text-[#2EC4B6]"
              />
            ) : (
              <p className="text-[#2EC4B6]">{watch("experience")}</p>
            )}
            {errors.experience && (
              <p className="text-red-500 text-xs">
                {errors.experience.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-[#FF9F1C] ">About Me:</label>
          {isEditing ? (
            <textarea
              cols={6}
              {...register("about", { required: "About is required" })}
              className="bg-transparent w-full border-0 border-b-[#2EC4B6] focus:border-b-[#2EC4B6] focus:ring-0 outline-none  border-b-2 text-[#2EC4B6] h-auto"
            />
          ) : (
            <p className="text-[#2EC4B6] w-full break-words">
              {watch("about")}
            </p>
          )}
          {errors.about && (
            <p className="text-red-500 text-xs">{errors.about.message}</p>
          )}
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
              className="px-4 py-2 cursor-pointer bg-teal-600 text-white rounded-md"
            >
              {loading ? (
                <ThreeDot easing="ease-in" size="small" color="#fff" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        )}
        {isEditing && (
          <p className="italic text-green-700 text-xs !mt-4">
            *Note: Email cannot be changed, once it registered.
          </p>
        )}
      </form>
    </div>
  );
};

export default Profile;

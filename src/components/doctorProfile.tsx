import { useForm } from "react-hook-form";
import { FaPen } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import avatar from "../assets/images/Dr. Amelia Brooks.png";
const DoctorProfileCard = () => {
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
    avatarUrl?: string;
  };
  const Qualifications = [
    "Bachelor’s Degree in Psychology",
    "Master’s Degree in Psychology",
    "Doctor of Psychology",
    "Doctor of Philosophy in Psychology",
  ];
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(avatar);

  const [user, setUser] = useState<User>({
    name: "John Doe",
    email: "john.doe@example.com",
    gender: "Male",
    phone: "1234567890",
    age: "29",
    qualification: "MBBS",
    specialist: "Cardiologist",
    experience: "5",
    about: "I am a cardiologist with 5 years of experience.",
    avatarUrl: "https://via.placeholder.com/100",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<User>();

  useEffect(() => {
    reset(user);
    setImagePreview(avatar);
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
    setImagePreview(avatar);
    setIsEditing(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setValue("avatarUrl", result, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
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
          <img
            src={imagePreview || avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full bg-gray-200"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 text-xs text-gray-600"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:mx-10 md:grid-cols-2 gap-2 md:gap-4 pl-11 pt-5">
          <div className="flex justify-center md:justify-start items-center w-full gap-2 ">
            <label className="text-[#FF9F1C]">Name:</label>
            <p className="text-[#2EC4B6]">{watch("name") || user.name}</p>
          </div>
          <div className="flex justify-center md:justify-start items-start w-full gap-2">
            <label className="text-[#FF9F1C]">Qualification:</label>
            <div className="flex flex-col">
              {isEditing ? (
                <>
                  <select
                    {...register("qualification", {
                      required: "Qualification is required",
                    })}
                    className="text-[#2EC4B6] bg-transparent border-0 border-b-[#2EC4B6] focus:border-b-green-primary-1 focus:ring-0  border-b-2"
                  >
                    <option value="" className="text-[#2EC4B6]">
                      Select a qualification
                    </option>
                    {Qualifications.map((qualification, index) => (
                      <option
                        key={index}
                        value={qualification}
                        className="text-[#2EC4B6]"
                      >
                        {qualification}
                      </option>
                    ))}
                  </select>
                  {errors.qualification && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.qualification.message}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-[#2EC4B6]">
                  {watch("qualification") || user.qualification}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center md:justify-start items-center w-full gap-2">
            <label className="text-[#FF9F1C]">Email:</label>
            <p className="text-[#2EC4B6] ">{watch("email") || user.email}</p>
          </div>
          <div className="flex justify-center md:justify-start items-center w-full gap-2">
            <label className="text-[#FF9F1C]">Specialist In:</label>
            {isEditing ? (
              <input
                {...register("specialist", {
                  required: "Specialist is required",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Specialist must contain only letters",
                  },
                })}
                className="bg-transparent border-0 border-b-[#2EC4B6] focus:border-b-green-primary-1 focus:ring-0  border-b-2 text-[#2EC4B6]"
                type="text"
              />
            ) : (
              <p className="text-[#2EC4B6]">
                {watch("specialist") || user.specialist}
              </p>
            )}
            {errors.specialist && (
              <p className="text-red-500 text-xs">
                {errors.specialist.message}
              </p>
            )}
          </div>
          <div className="flex justify-center md:justify-start items-center w-full gap-2">
            <label className="text-[#FF9F1C]">Gender:</label>
            {isEditing ? (
              <select
                {...register("gender", { required: "Gender is required" })}
                className="bg-transparent border-0 border-b-[#2EC4B6] focus:border-b-green-primary-1 focus:ring-0  border-b-2 text-[#2EC4B6]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-[#2EC4B6]">{watch("gender") || user.gender}</p>
            )}
            {errors.gender && (
              <p className="text-red-500 text-xs">{errors.gender.message}</p>
            )}
          </div>
          <div className="flex justify-center md:justify-start items-center w-full gap-2">
            <label className="text-[#FF9F1C]">Experience:</label>
            {isEditing ? (
              <input
                {...register("experience", {
                  required: "experience is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "experience must be a number",
                  },
                })}
                className="bg-transparent border-0 border-b-[#2EC4B6] focus:border-b-green-primary-1 focus:ring-0  border-b-2 text-[#2EC4B6]"
                type="text"
              />
            ) : (
              <p className="text-[#2EC4B6]">
                {watch("experience") || user.experience}
              </p>
            )}
            {errors.experience && (
              <p className="text-red-500 text-xs">
                {errors.experience.message}
              </p>
            )}
          </div>
          <div className="flex justify-center md:justify-start items-center w-full gap-2">
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
        </div>
        <div className="p-5 pl-11">
          <p className="text-[#FF9F1C]">About Me</p>
          {isEditing && (
            <div className="flex gap-3 justify-start items-center">
              <textarea
                {...register("about", { required: "About is required" })}
                className="w-full bg-transparent border-0 border-b-[#2EC4B6] focus:border-b-[#2EC4B6] focus:ring-0  border-b-2 text-[#2EC4B6]"
                rows={3}
              />
              {errors.about && (
                <p className="text-red-500 text-xs">{errors.about.message}</p>
              )}
            </div>
          )}
        </div>
        {isEditing && (
          <div className="flex gap-4 justify-end my-2">
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

export default DoctorProfileCard;

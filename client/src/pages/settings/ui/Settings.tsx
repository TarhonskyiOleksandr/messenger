import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast/headless";
import { ProfileTick } from "iconsax-react";

import { selectMe, updateMe } from "@/entities/me";
import { UserAvatar } from "@/shared/ui";
import { ISettingsForm } from '../types';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/store";

export const Settings = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ISettingsForm>();
  const { data } = useAppSelector(selectMe);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ISettingsForm> = async (data) => {
    try {
      await dispatch(updateMe(data));
      toast(
        'Updated!',
        { icon:
            <ProfileTick
              size="24"
              color="rgb(74 222 128)"
            />
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setValue('userName', data?.userName);
    setValue('email', data?.email);
  }, [data, setValue]);

  return (
    <div
      className="grid grid-cols-[1fr_2fr_1fr]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div />
      <form className="flex flex-col items-center pt-7">
        <UserAvatar
          name={data?.userName}
          size="lg"
        />
        <div className="flex flex-col w-full mt-3">
          <div className="mb-4">
            <label htmlFor="userName">
              Full Name
            </label>
            <input
              {...register('userName', {
                required: 'This field is required',
                pattern: {
                  value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*\s*$/i,
                  message: "Name contains invalid symbols"
                }
              })}
              id="userName"
            />
            {
              errors.userName &&
              <p className="validation-error">
                {errors.userName.message}
              </p>
            }
          </div>

          <div className="mb-5">
            <label htmlFor="email">
              Email
            </label>
            <input
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,12}$/i,
                  message: 'Invalid email address'
                },
              })}
              id="email"
            />
            {
              errors.email &&
              <p className="validation-error">
                {errors.email.message}
              </p>
            }
          </div>

        <button
          type="submit"
          className="btn-primary w-full"
        >
          Save
        </button>
        </div>
      </form>
    </div>
  );
};

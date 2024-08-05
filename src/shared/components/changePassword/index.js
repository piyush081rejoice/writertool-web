import React, { useState } from "react";
import styles from "./changePassword.module.scss";
import classNames from "classnames";
import CloseIcon from "@/assets/icons/closeIcon";
import Input from "../input";
import { useOnChange } from "@/hooks/onChangeHook";
import { ApiPut } from "@/helpers/API/ApiData";
import toast from "react-hot-toast";
import Loader from "@/common/Loader";
import { PASSWORD_PATTERN } from "@/helpers/Constant";
import ShowError from "@/common/ShowError";
const Logo = "/assets/logo/logo.svg";
const EyeIcon = "/assets/icons/eye.svg";
const OpenEye = "/assets/icons/OpenEye.svg";

export default function ChangePassword({ setShowPasswordModal }) {
  const [showPassword, setShowPassword] = useState({ currentPassword: false, newPassword: false, confirmPassword: false });
  const [isLoading, setIsLoading] = useState(false);
  const { inputValue, handleChange ,setErrors ,errors } = useOnChange();

  const togglePassword = (value) => {
    setShowPassword({ ...showPassword, [value]: !showPassword[value] });
  };

  const validateForm = () => {
    let formIsValid = true;
    if (!PASSWORD_PATTERN.test(inputValue?.newPassword)) {
      setErrors((prevErrors) => ({ ...prevErrors, newPassword: "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number." }));        
      return false
    }
    if (!(inputValue?.newPassword.trim() === inputValue?.confirmPassword.trim())) {
      formIsValid = false;
      toast.error("Password and Confirm Password do not match. Please ensure both fields contain the same password.");
    }
    return formIsValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const data = {
          oldPassword: inputValue?.currentPassword,
          newPassword: inputValue?.newPassword,
          confirmNewPassword: inputValue?.confirmPassword,
        };

        const resp = await ApiPut("user-services/user/reset-password", data);
        if (resp?.data?.success) {
          setIsLoading(false);
          toast.success("Your password has been successfully changed.");
          setShowPasswordModal(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "You're already subscribed for the Newsletter");
        setIsLoading(false);
      }
    }
  };
  return (
    <div>
      <div className={classNames(styles.openModalWrapper, styles.changePasswordWrapper)}>
        <div className={styles.modalDesign}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.closeRightAlignment}>
              <span onClick={() => setShowPasswordModal(false)}>
                <CloseIcon />
              </span>
            </div>
            <div className={styles.logoAlignment}>
              <img src={Logo} alt="Logo" />
            </div>
            <h2>Change Password</h2>
            <div className={styles.spacer}>
              <Input
                onIconClick={() => togglePassword("currentPassword")}
                icon={`${showPassword?.currentPassword ? EyeIcon : OpenEye}`}
                type={showPassword?.currentPassword ? "text" : "password"}
                label="Current Password"
                placeholder="Enter your current password"
                name={"currentPassword"}
                value={inputValue?.currentPassword}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className={styles.spacer}>
              <Input
                onIconClick={() => togglePassword("newPassword")}
                icon={`${showPassword?.newPassword ? EyeIcon : OpenEye}`}
                type={showPassword?.newPassword ? "text" : "password"}
                label="New Password"
                placeholder="Enter your new password"
                name={"newPassword"}
                value={inputValue?.newPassword}
                onChange={handleChange}
                required={true}
              />
              {errors?.newPassword ?  <ShowError errorMessage={errors?.newPassword}/> :null}
            </div>
            <div className={styles.spacer}>
              <Input
                onIconClick={() => togglePassword("confirmPassword")}
                icon={`${showPassword?.confirmPassword ? EyeIcon : OpenEye}`}
                type={showPassword?.confirmPassword ? "text" : "password"}
                label="Confirm Password"
                placeholder="Enter your confirm new password"
                name={"confirmPassword"}
                value={inputValue?.confirmPassword}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className={styles.button}>
              <button type="submit" aria-label="Change Password" disabled={isLoading}>
                Change Password {isLoading ? <Loader /> : null}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

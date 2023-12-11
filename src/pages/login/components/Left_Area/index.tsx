/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-01-03 15:09:35
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-05-12 17:48:54
 * @FilePath: \MoneyManageSystem\src\pages\login\components\Left_Area\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";

import { Carousel, theme } from "antd";
import { useTranslation } from "react-i18next";
import introduceImg from "@/assets/img/undraw_Customer_survey_re_v9cj.svg";
import introduceImg2 from "@/assets/img/undraw_Statistics_re_kox4.svg";
import introduceImg3 from "@/assets/img/undraw_spread_love_r9jb.svg";
import styles from "../index.module.less";

const { useToken } = theme;

export default function LeftArea() {
  const { token } = useToken();

  const { t } = useTranslation();

  return (
    <div
      className={styles["left-wrap"]}
      style={{ backgroundColor: token.colorPrimary }}
    >
      <Carousel
        className={styles["carouse-wrap"]}
        autoplay
        autoplaySpeed={5000}
      >
        <div className={styles["introduce-wrap"]}>
          <div className={styles["introduce-img-wrap"]}>
            <img src={introduceImg} alt="" height="100%" />
          </div>
          <div className={styles["introduce-text-wrap"]}>
            <div className={styles["introduce-text-context"]}>
              <div className={styles["introduce-title"]}>
                {t("login-left-img1-title")}
              </div>
              <div className={styles["introduce-desc"]}>
                {t("login-left-img1-desc")}
              </div>
            </div>
          </div>
        </div>

        <div className={styles["introduce-wrap"]}>
          <div className={styles["introduce-img-wrap"]}>
            <img src={introduceImg2} alt="" height="100%" />
          </div>
          <div className={styles["introduce-text-wrap"]}>
            <div className={styles["introduce-text-context"]}>
              <div className={styles["introduce-title"]}>
                {t("login-left-img2-title")}
              </div>
              <div className={styles["introduce-desc"]}>
                {t("login-left-img2-desc")}
              </div>
            </div>
          </div>
        </div>

        <div className={styles["introduce-wrap"]}>
          <div className={styles["introduce-img-wrap"]}>
            <img src={introduceImg3} alt="" height="100%" />
          </div>
          <div className={styles["introduce-text-wrap"]}>
            <div className={styles["introduce-text-context"]}>
              <div className={styles["introduce-title"]}>
                {t("login-left-img3-title")}
              </div>
              <div className={styles["introduce-desc"]}>
                {t("login-left-img3-desc")}
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

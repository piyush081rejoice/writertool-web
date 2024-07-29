import React from "react";
import styles from "./pagination.module.scss";
import cn from "classnames";
// import Icon from "../../../assets/svg/repeat-icon.svg";
export default function Pagination(props) {
  const { pages = 1, current = 1, wrapperClass, onClick } = props;
  const onPrev = () => {
    onClick && onClick(current - 1);
  };
  const onNext = () => {
    onClick && onClick(current + 1);
  };
  const onPrevDash = () => {
    onClick && onClick(current - 2);
  };
  const onNextDash = () => {
    onClick && onClick(current + 2);
  };
  const onFirst = () => {
    onClick && onClick(1);
  };
  const onLast = () => {
    onClick && onClick(pages);
  };

  return (
    <div className={cn(wrapperClass)}>
      <div className={styles["paginationAllContnetAlignment"]} id="scrollToTopButton">
        {current !== 1 ? (
          <div onClick={() => onPrev()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </div>
        ) : (
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </div>
        )}
        {current !== 1 && (
          <div
            onClick={() => {
              onFirst();
            }}
          >
            1
          </div>
        )}
        {current > 3 && (
          <div
            onClick={() => {
              onPrevDash();
            }}
          >
            ...
          </div>
        )}
        {current - 1 > 1 && (
          <div
            onClick={() => {
              onPrev();
            }}
          >
            {current - 1}
          </div>
        )}
        <div className={styles.active}>{current}</div>
        {current + 1 < pages && (
          <div
            onClick={() => {
              onNext();
            }}
          >
            {current + 1}
          </div>
        )}
        {current <= pages - 3 && (
          <div
            onClick={() => {
              onNextDash();
            }}
          >
            ...
          </div>
        )}
        {pages === 0
          ? null
          : current !== pages && (
              <div
                onClick={() => {
                  onLast();
                }}
              >
                {pages}
              </div>
            )}

        {pages === 0 ? (
          <div disabled>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </div>
        ) : current !== pages ? (
          <div onClick={onNext}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </div>
        ) : (
          <div disabled>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import styles from "./PaymentHistory.module.scss";
import WaveIcon from "@/assets/icons/waveIcon";
import { ApiGet } from "@/helpers/API/ApiData";
import NoNotification from "@/shared/components/NoBlogFound/NoNotification";
import Pagination from "@/shared/components/pagination/pagination";
import Skeleton from "react-loading-skeleton";
import moment from "moment";

export default function PaymentHistory() {
  const [pagination, setPagination] = useState(1);
  const [PaymentHistoryCounts, setPaymentHistoryCounts] = useState(1);
  console.log("🚀 ~ file: index.js:9 ~ PaymentHistory ~ PaymentHistoryCounts:", PaymentHistoryCounts);
  const [paymentsTransaction, setPaymentsTransaction] = useState([]);
  console.log("🚀 ~ file: index.js:10 ~ PaymentHistory ~ paymentsTransaction:", paymentsTransaction);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isLoading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);
  useEffect(() => {
    handleGetNotification();
  }, [pagination]);

  const handleGetNotification = async () => {
    try {
      setIsLoading(true);
      const response = await ApiGet(`blog-services/payment/get-my-payment-history?page=${pagination}`);
      const data = response?.data;
      console.log("🚀 ~ file: index.js:28 ~ handleGetNotification ~ data:", data);
      if (data?.success) {
        setIsLoading(false);
        setPaymentsTransaction(data?.payload?.payments);
        setPaymentHistoryCounts(data?.payload?.counts);
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message ? error?.response?.data?.payload?.message : error?.response?.data?.message || "Something went wrong");
      setIsLoading(false);
    }
  };
  const renderSkeleton = () => (
    <table>
      <thead>
        <tr>
          <th>
            <Skeleton width={100} />
          </th>
          <th>
            <Skeleton width={150} />
          </th>
          <th>
            <Skeleton width={80} />
          </th>
          <th>
            <Skeleton width={100} />
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <tr key={index}>
            <td>
              <Skeleton height={20} />
            </td>
            <td>
              <Skeleton height={20} />
            </td>
            <td>
              <Skeleton height={20} />
            </td>
            <td>
              <Skeleton height={20} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  return (
    <>
      <div className={styles.frequentlyAskedQuestions}>
        <div className="container">
          <div className={styles.title}>
            <h2>Payment History</h2>
            <WaveIcon />
          </div>
          <div className={styles.paymentDiv}>
            {isLoading ? (
              <div className={styles.paymentList}>{renderSkeleton()}</div>
            ) : paymentsTransaction.length > 0 ? (
              <div className={styles.paymentList}>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Blog</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentsTransaction.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <div className={styles.date}>{moment(data?.createdAt).subtract(1, "days").format("DD-MM-YYYY")}</div>
                        </td>
                        <td>
                          <div className={styles.blog}>{data?.blogId?.title}</div>
                        </td>
                        <td>
                          <div className={styles.amount}>${data?.amount}</div>
                        </td>
                        <td>{data?.status === "Paid" ? <div className={styles.status}>Successful</div> : <div className={styles.statusFail}>Failed</div>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {PaymentHistoryCounts > 10 ? <Pagination pages={Math.ceil(PaymentHistoryCounts / 10)} current={pagination} onClick={setPagination} /> : null}
              </div>
            ) : (
              <NoNotification />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

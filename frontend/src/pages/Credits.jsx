import React, { use } from "react";
import { useState, useEffect } from "react";
import { dummyPlans } from "../assets/assets";
import Loading from "./Loading";
import { useAppContext } from "../context/AppContext";

const Credits = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token, axios, toast } = useAppContext();

  const fetchPlans = async () => {
    try {
      const { data } = await axios.get("/api/credit/plans", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setPlans(data.plans);
      } else {
        toast.error(data.message);
        // setPlans(dummyPlans); // fallback
      }
    } catch (error) {
      toast.error(error.message);
      // setPlans(dummyPlans); // fallback
    }
    setLoading(false);
  };

  const purchasePlan = async (planId) => {
    try {
      const { data } = await axios.post(
        "/api/credit/purchase",
        { planId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Redirecting to payment...");
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6 pt-12 x1:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll">
      <div className="p-6 pt-12 x1:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-purple-100 text-center">
          Credits Plans
        </h2>
        {plans.length === 0 ? (
          <p className="text-gray-600 dark:text-purple-300">
            No credit plans available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#1E1B26] rounded-lg shadow-md overflow-hidden cursor-pointer p-4 flex flex-col justify-between gap-4"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-purple-100 mb-2">
                  {plan.name}
                </h3>
                {/* <p className="text-sm text-gray-600 dark:text-purple-300 mb-4">
                  {plan.description}
                </p> */}
                <p className="text-xl font-bold text-gray-800 dark:text-purple-100 mb-4">
                  ${plan.price}
                  <span> / {plan.credits} Credits</span>
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-purple-200 space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>

                <button onClick={()=>purchasePlan(plan._id)} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded">
                  Purchase
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Credits;

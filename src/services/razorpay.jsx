export const openRazorpay = ({
  amount,
  bookingData,
  selectedGuide,
  selectedPlaces,
  onSuccess,
}) => {

  if (!window.Razorpay) {
    alert("Razorpay SDK not loaded");
    return;
  }

  const options = {
    key: "rzp_test_T1nKHVi3crHSPg",

    amount: Number(amount) * 100,

    currency: "INR",

    name: "Rama Janma Bhoomi",

    description: `Guide Booking - ${selectedGuide?.name}`,

    image: "/assets/temple-logo.png",

    prefill: {
      name: bookingData?.name || "",
      contact: bookingData?.phone || "",
    },

    notes: {
      guide: selectedGuide?.name || "",
      places:
        selectedPlaces
          ?.map((p) => p.name)
          .join(", ") || "",
    },

    theme: {
      color: "#ff7b00",
    },

    handler: function (response) {

      if (onSuccess) {
        onSuccess(response);
      }

    },

    modal: {
      ondismiss: function () {
        console.log(
          "Payment popup closed"
        );
      },
    },
  };

  const razorpay =
    new window.Razorpay(options);

  razorpay.open();
};
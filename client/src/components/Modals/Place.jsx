import "./Place.css";
import { useEffect, useState } from "react";
import { api } from "../../routes/routes";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Map from "../Map/Map";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { notify } from "../../utils/notify";
import { useDispatch, useSelector } from "react-redux";
import { clearTable } from "../../table/slice";

const Place = ({ orders, total, hideModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.table.user);

  const [inputs, setInputs] = useState({
    name: user.name,
    phone: user.phone,
    orderType: "delivery",
    pickupTime: "00:00",
    location: null,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setInputs((prevInputs) => {
      return { ...prevInputs, [name]: type === "checkbox" ? checked : value };
    });
  };

  // Location
  const [location, setLocation] = useState({
    lat: -1.2921,
    lon: 36.8219,
  });
  const success = (position) => {
    const { latitude, longitude } = position.coords;
    setLocation(() => {
      return {
        lat: latitude,
        lon: longitude,
      };
    });
  };
  const errors = (err) => {
    console.log(err);
  };
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((res) => {
        if (res.state === "granted" || res.state === "prompt") {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        }
      });
    } else {
      console.log("Geolocation is not available");
    }
  };

  // PDF (Receipt)
  const generatePdf = async (orderId) => {
    const doc = await PDFDocument.create();

    // Text Variables
    const fontSize = 12;
    const font = await doc.embedFont(StandardFonts.TimesRoman);
    const fontBold = await doc.embedFont(StandardFonts.TimesRomanBold);

    const customWidth = 4 * 72;
    const customHeight = 32 * orders.length + 70 + 120;
    const page = doc.addPage([customWidth, customHeight]);
    const { width, height } = page.getSize();

    const imageUrl = "/images/pizza-logo.png";

    // Create a PDFImage instance from the image URL
    const image = await fetch(imageUrl)
      .then((response) => response.arrayBuffer())
      .then((imageData) => doc.embedPng(imageData));

    // Pizza Inn Logo
    page.drawImage(image, {
      x: (width - 150) / 2,
      y: height - 50,
      width: 150,
      height: 150 * (image.height / image.width),
    });

    // Date of the receipt
    page.drawText(
      `${new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "medium",
      }).format(new Date())}`,
      {
        x: (width - 200) / 2,
        y: height - 50 - 10,
        size: fontSize,
        color: rgb(0, 0, 0),
        font: font,
      }
    );

    // Title of the receipt
    const titleWidth = font.widthOfTextAtSize("Order Details", fontSize + 2);
    page.drawText("Order Details", {
      x: (width - titleWidth) / 2,
      y: height - 50 - 10 - fontSize + 2 - 5,
      size: fontSize + 2,
      color: rgb(0, 0, 0),
      font: fontBold,
    });
    // Order Number
    page.drawText(`Order Number: ${orderId}`, {
      x: 10,
      y: height - 50 - 10 - fontSize + 2 - 5 - fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
      font: font,
    });

    // Content of the receipt
    let y = height - 10 - fontSize - 80;
    for (let i = 0; i < orders.length; i++) {
      let order = orders[i];
      const capitalizedTitle = order.title
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      page.drawText(`${capitalizedTitle}`, {
        x: 10,
        y: y,
        size: fontSize,
        color: rgb(0, 0, 0),
        font: fontBold,
      });
      const subtotalWidth = font.widthOfTextAtSize(
        `Ksh. ${order.quantity * order.price}`,
        fontSize
      );
      page.drawText(`Ksh. ${order.quantity * order.price}`, {
        x: width - 10 - subtotalWidth,
        y: y,
        size: fontSize,
        color: rgb(0, 0, 0),
        font: fontBold,
      });
      // Next line but same order
      y -= fontSize + 1;
      page.drawText(
        `${order.quantity} ${
          order.size !== undefined
            ? order.size.charAt(0).toUpperCase() + order.size.slice(1)
            : order.category.charAt(0).toUpperCase() + order.category.slice(1)
        } @ Ksh.${order.price}`,
        {
          x: 15,
          y,
          size: fontSize - 2,
          color: rgb(0, 0, 0),
          font: font,
        }
      );
      const categoryWidth = font.widthOfTextAtSize(
        `${order.category.charAt(0).toUpperCase() + order.category.slice(1)}`,
        fontSize - 2
      );
      page.drawText(
        `${order.category.charAt(0).toUpperCase() + order.category.slice(1)}`,
        {
          x: width - 10 - categoryWidth,
          y,
          size: fontSize - 2,
          color: rgb(0, 0, 0),
          font: font,
        }
      );

      // Add a space for the next order
      y -= fontSize + 5;
    }

    page.drawText("Total", {
      x: 10,
      y,
      size: fontSize,
      color: rgb(0, 0, 0),
      font: fontBold,
    });

    const totalWidth = font.widthOfTextAtSize(`Ksh. ${total}`, fontSize);
    page.drawText(`Ksh. ${total}`, {
      x: width - 10 - totalWidth,
      y,
      size: fontSize,
      color: rgb(0, 0, 0),
      font: fontBold,
    });

    y -= fontSize + 5;

    // Customer Details
    const customerWidth = font.widthOfTextAtSize("Customer Details", fontSize);
    page.drawText("Customer Details", {
      x: (width - customerWidth) / 2,
      y,
      size: fontSize,
      color: rgb(0, 0, 0),
      font: fontBold,
    });

    y -= fontSize + 1;

    page.drawText(`Name: ${inputs.name}`, {
      x: 10,
      y: y,
      size: fontSize - 1,
      color: rgb(0, 0, 0),
      font,
    });

    y -= fontSize;

    page.drawText(`Phone: ${inputs.phone}`, {
      x: 10,
      y: y,
      size: fontSize - 1,
      color: rgb(0, 0, 0),
      font,
    });

    y -= fontSize;
    const capitalizedOrderType = inputs.orderType
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    page.drawText(`Order Type: ${capitalizedOrderType}`, {
      x: 10,
      y: y,
      size: fontSize - 1,
      color: rgb(0, 0, 0),
      font,
    });
    y -= fontSize;

    page.drawText(
      `Location: ${inputs.orderType === "delivery" ? "from" : "at"} ${
        inputs.location.name
      } ${inputs.orderType !== "delivery" ? `at ${inputs.pickupTime}` : ""}`,
      {
        x: 10,
        y: y,
        size: fontSize - 1,
        color: rgb(0, 0, 0),
        font,
      }
    );

    y -= fontSize + 5;
    // Thank You
    const thanksWidth = font.widthOfTextAtSize("Thank You", fontSize + 1);
    page.drawText("Thank You", {
      x: (width - thanksWidth) / 2,
      y,
      size: fontSize + 1,
      color: rgb(0, 0, 0),
      font: fontBold,
    });

    // Serialize the PDF to bytes
    const pdfBytes = await doc.save();

    // Create a Blob from the PDF bytes
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

    // Create a URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Create a link element for downloading
    const downloadLink = document.createElement("a");
    downloadLink.href = pdfUrl;
    downloadLink.download = "receipt.pdf"; // Set the desired filename

    // Trigger the click event to initiate the download
    downloadLink.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(pdfUrl);
  };

  // Place Order
  // // Get location and till number
  const updateLocation = (details) => {
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        location: details,
      };
    });
  };
  const [transactionStatus, setTranscationStatus] = useState("none"); // ["processing", "success", "failed", "none"]
  const [orderStatus, setOrderStatus] = useState("none"); // ["processing", "success", "failed", "none"]
  const handlePlaceOrder = async () => {
    try {
      if (
        (inputs.orderType === "in-store pickup" &&
          inputs.pickupTime.split(":")[0] < 7) ||
        (inputs.orderType === "in-store pickup" &&
          inputs.pickupTime.split(":")[0] > 21)
      ) {
        notify(500, "Please select a time between 07:00 and 21:00");
      } else if (inputs.location === null) {
        notify(500, "Please select a location from the map");
        return;
      } else if (user.email.verified === false) {
        notify(500, "Please verify that you are human");
      } else if (inputs.phone === "") {
        notify(500, "Please enter your phone number");
      } else {
        // Add Phone Number to MongoDB
        await api.put("/users/edit", {
          details: {
            _id: user._id,
            phone: inputs.phone,
            amount: total,
            avail: true,
          },
        });
        // Start Mpesa transaction processing
        setTranscationStatus("processing");
        const paymentResponse = await api.post("/payments/lipa-na-mpesa", {
          details: { amount: total, phone: `254${inputs.phone}` },
        });

        // Successful transcation
        if (paymentResponse.data.response.ResponseCode === "0") {
          setTranscationStatus("success");
          notify(200, "Payment Successful. Generating Receipt..");
          // Start Processing Order
          setOrderStatus("processing");
          const orderResponse = await api.post("/orders/add", {
            order: {
              user: user._id,
              orders: orders,
              location: inputs.location,
              orderType: inputs.orderType,
              pickupTime: inputs.pickupTime,
            },
          });
          // Successful Order
          if (orderResponse.data._id) {
            notify(200, "Order Placed Successfully");
            setOrderStatus("success");
            // Generate Receipt
            // Add security to receipt pdf.. mpesa transaction-id
            generatePdf(orderResponse.data._id);
            // Clear table
            dispatch(clearTable());
            // Hide Modal
            hideModal();
          } else {
            // Failed Order
            notify(500, "Order Failed");
            setOrderStatus("failed");
          }
        } else {
          // Failed Transaction
          setTranscationStatus("failed");
          notify(500, "Payment Failed");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="place">
      <div className="inputs">
        <div>
          <span>Name: </span>
          <input value={inputs.name} onChange={null} readOnly type="text" />
        </div>
        <div>
          <span>
            <label htmlFor="phone">Phone: </label>
          </span>
          <input
            name="phone"
            value={inputs.phone}
            onChange={handleInputChange}
            type="tel"
            placeholder="700000000"
            maxLength={9}
          />
        </div>
        <div>
          <span>Order Type</span>
          <div>
            <div>
              <input
                id="delivery"
                name="orderType"
                value="delivery"
                checked={inputs.orderType === "delivery"}
                onChange={handleInputChange}
                type="radio"
              />
              <span>
                <label htmlFor="delivery">Delivery</label>
              </span>
            </div>
            <div>
              <input
                id="pickup"
                name="orderType"
                value="in-store pickup"
                checked={inputs.orderType === "in-store pickup"}
                onChange={handleInputChange}
                type="radio"
              />
              <span>
                <label htmlFor="pickup">In-store Pickup</label>
              </span>
            </div>
          </div>
        </div>
        {inputs.orderType === "in-store pickup" && (
          <div>
            <span>
              <label htmlFor="pickupTime">
                Pickup Time: (between 07:00 and 21:00)
              </label>
            </span>
            <input
              name="pickupTime"
              value={inputs.pickupTime}
              onChange={handleInputChange}
              type="time"
              max={"21:00"}
              min={"07:00"}
            />
          </div>
        )}
        <div className="location">
          <span>Location</span>
          <Map
            location={location} // To map the default/current location
            orderLocation={inputs.location} // To get the location where the order is picked up at/ delivered from
            updateLocation={updateLocation}
            orderType={inputs.orderType}
          />
        </div>
        <button onClick={handlePlaceOrder}>
          <span>Submit</span>
        </button>
      </div>
      <div className="transaction">
        <span className="title transaction-title">Transaction</span>
        <div className="total">
          <span>Total:</span>
          <span>Ksh. {total}</span>
        </div>
        <div className="info">
          <span className="title">Status</span>
          <div className="info-till">
            <span>Till Number:</span>
            <span>
              {inputs.location !== null ? inputs.location.till_no : "N/A"}
            </span>
          </div>
          <div className="info-processing">
            {transactionStatus === "processing" ? (
              <>
                <div className="loader"></div>
                <span>Processing..</span>
              </>
            ) : transactionStatus === "success" ? (
              <>
                <BsCheckCircle />
                <span>Transaction Successful</span>
              </>
            ) : (
              transactionStatus === "failed" && (
                <>
                  <BsXCircle />
                  <span>Transaction Failed.</span>
                </>
              )
            )}
          </div>
        </div>
        <div className="order">
          <span className="title">Order</span>
          <div className="info-processing">
            {orderStatus === "processing" ? (
              <>
                <div className="loader"></div>
                <span>Processing..</span>
              </>
            ) : orderStatus === "success" ? (
              <>
                <BsCheckCircle />
                <span>Order Successful</span>
              </>
            ) : (
              orderStatus === "failed" && (
                <>
                  <BsXCircle />
                  <span>Order Failed.</span>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Place;

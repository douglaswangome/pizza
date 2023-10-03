import "./Place.css";
import { useState } from "react";
import { api } from "../../routes/routes";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const Place = ({ orders, total }) => {
  const [success, setSuccess] = useState(false);

  const onVerify = (token) => {
    console.log(token);
    if (token) {
      api
        .post("/verify/token", { token })
        .then((response) => {
          if (response.status === 200) {
            setSuccess(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const generatePdf = async () => {
    const doc = await PDFDocument.create();

    // Text Variables
    const fontSize = 12;
    const font = await doc.embedFont(StandardFonts.TimesRoman);
    const fontBold = await doc.embedFont(StandardFonts.TimesRomanBold);

    const customWidth = 4 * 72;
    const customHeight = 50 * orders.length;

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
    const titleWidth = font.widthOfTextAtSize("Receipt", fontSize + 4);
    page.drawText("Receipt", {
      x: (width - titleWidth) / 2,
      y: height - 50 - 10 - fontSize + 4 - 5,
      size: fontSize + 4,
      color: rgb(0, 0, 0),
      font: fontBold,
    });

    // Content of the receipt
    let y = height - 50 - 10 - fontSize - 20;
    for (let i = 0; i < orders.length; i++) {
      let order = orders[i];
      const capitalizedTitle = order.title
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      page.drawText(`${capitalizedTitle}`, {
        x: 10,
        y: y,
        size: fontSize + 1,
        color: rgb(0, 0, 0),
        font: fontBold,
      });
      const subtotalWidth = font.widthOfTextAtSize(
        `Ksh. ${order.quantity * order.price}`,
        fontSize + 1
      );
      page.drawText(`Ksh. ${order.quantity * order.price}`, {
        x: width - 10 - subtotalWidth,
        y: y,
        size: fontSize + 1,
        color: rgb(0, 0, 0),
        font: fontBold,
      });
      // Next line but same order
      y -= fontSize + 5;
      page.drawText(
        `${order.quantity} ${
          order.size !== undefined
            ? order.size.charAt(0).toUpperCase() + order.size.slice(1)
            : order.category.charAt(0).toUpperCase() + order.quantity > 1
            ? order.category.slice(1)
            : order.category.slice(1, -1)
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
      y -= fontSize + 15;
    }

    // Customer Details

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

  return (
    <div className="place">
      <div className="inputs">
        <div>
          <span>Name: </span>
          <input type="text" />
        </div>
        <div>
          <span>Phone: </span>
          <input type="tel" />
        </div>
        <div>
          <span>Order Type</span>
          <div>
            <div>
              <input type="radio" />
              <span>Delivery</span>
            </div>
            <div>
              <input type="radio" />
              <span>In-store Pickup</span>
            </div>
          </div>
        </div>
        <div>
          <HCaptcha
            theme="dark"
            onVerify={(token) => onVerify(token)}
            sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
          />
          <span>{success ? "Success" : "Failed"}</span>
        </div>
        <button onClick={generatePdf}>
          <span>Submit</span>
        </button>
      </div>
      <div className="mpesa"></div>
    </div>
  );
};

export default Place;

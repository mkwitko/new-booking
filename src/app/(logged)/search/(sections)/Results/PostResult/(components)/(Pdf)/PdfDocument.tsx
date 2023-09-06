/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Path,
  Rect,
  Font,
  Image,
} from "@react-pdf/renderer";
import { Auth } from "aws-amplify";
import { format } from "date-fns";
import { RoomType } from "@/classes/availability/DTO/AvailabilityDTO";
import { fCurrency } from "@/utils/FinanceUtil";
import { maskPhone } from "@/utils/B2BUtils";
import _ from "lodash";
import pt from "@/assets/translation/pt.json";
import en from "@/assets/translation/en.json";
import es from "@/assets/translation/es.json";

interface PdfProps {
  checkIn: Date;
  checkOut: Date;
  room: number;
  adult: number;
  cityName: string;
  salePoint: string;
  rooms: RoomType[];
}

const styles = StyleSheet.create({
  badNumber: {
    color: "#727578",
    fontSize: 12,
  },
  apartmentName: {
    color: "#24262B",
    fontSize: 16,

    fontWeight: 300,
    fontStyle: "normal",
    paddingTop: 5,
    paddingBottom: 5,
  },
  hotelSecondary: {
    color: "#727578",
    fontSize: 10,

    marginTop: 5,
  },
  hotelTitle: {
    color: "#6690FF",
    textTransform: "uppercase",
    fontSize: 14,
  },
  hotelImage: {
    width: 43,
    height: 43,
    borderRadius: 5,
    marginRight: 5,
  },
  listItem: {
    width: "97%",
    borderRadius: 10,
    backgroundColor: "#F4F7FA",
    height: 90,
    display: "flex",
    padding: 8,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 16,
  },
  mb10: {
    marginBottom: 10,
  },
  responsibleContentTextSecondary: {
    color: "#727578",
    fontSize: 8,

    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  responsibleContentText: {
    color: "#24262B",
    fontSize: 10,

    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "normal",
    marginTop: 5,
  },
  responsibleText: {
    color: "#6690FF",
    fontSize: 12,

    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  responsibleBox: {
    display: "flex",
    padding: 8,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    borderRadius: 10,
    backgroundColor: "#F4F7FA",
    width: "100%",
    height: 98,
  },
  destinationLocationText: {
    color: "#24262B",
    fontSize: 9,

    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  destinationText: {
    color: "#6690FF",
    fontSize: 9,

    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    textTransform: "uppercase",
  },
  destinationBox: {
    display: "flex",
    padding: 8,
    flexDirection: "column",
    alignItems: "flex-start",
    borderRadius: 10,
    backgroundColor: "#F4F7FA",
    width: 140,
    height: 52,
  },
  dailyBetweenText: {
    color: "#24262B",
    fontSize: 9,

    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  dailyText: {
    color: "#6690FF",
    fontSize: 9,

    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    textTransform: "uppercase",
  },
  dailyBox: {
    display: "flex",
    padding: 8,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    borderRadius: 10,
    backgroundColor: "#F4F7FA",
    width: 149,
    height: 52,
  },
  mr16: {
    marginRight: 16,
  },
  calendarContainer: {
    width: 124,
    height: 60,
    flexShrink: 0,
    borderRadius: 10,
    border: "1px solid #8c8c8c",
    backgroundColor: "#FFFFFF",
  },
  calendarHeader: {
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#273472",
    height: 16,
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  calendarHeaderText: {
    color: "#FFFFFF",
    fontSize: 10,

    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  calendarContentText: {
    color: "#6690FF",
    fontSize: 16,

    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
    textTransform: "uppercase",
    marginLeft: 10,
  },
  calendarContent: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 2,
  },
  calendarFooterText: {
    color: "#6690FF",
    fontSize: 10,

    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  calendarFooter: {
    justifyContent: "space-around",
    alignItems: "center",
    height: 16,
  },
  mt12: {
    marginTop: 12,
  },
  ml8: {
    marginLeft: 8,
  },
  mt8: {
    marginTop: 8,
  },
  page: {
    flexDirection: "column",
  },
  header: {
    height: 89,
    backgroundColor: "#1B144B",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    borderBottom: "4 solid #EE4978",
  },
  headerText: {
    color: "rgba(255,255,255)",
    fontWeight: "semibold",
    fontSize: 24,

    textAlign: "left",
    marginLeft: 20,
    textTransform: "uppercase",
    marginBottom: 15,
  },
  contentTitle: {
    color: "#6690FF",
    fontSize: 16,

    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
    textTransform: "uppercase",
    marginBottom: 15,
  },
  content: {
    paddingLeft: 20,
    paddingTop: 22,
  },
  contentRow: {
    flexDirection: "row",
  },
});

export default function PdfDocument({ data }: { data: PdfProps }) {
  const [userInfo, setUserInfo] = useState<any | null>();
  const [priceRange, setPriceRange] = useState<number[]>([]);

  function findPriceRange() {
    const price: number[] = [];

    data.rooms.forEach((room: any) => {
      if (room.averageRates) {
        price.push(room.averageRates.totalAmountAfterTax);
      }
    });

    const minPrice = Math.min(...price);
    const maxPrice = Math.max(...price);
    setPriceRange([minPrice, maxPrice]);
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      if (user) {
        setUserInfo(user);
      }
    });
    findPriceRange();
  }, []);

  let { translation } = pt;

  if (userInfo?.attributes.locale === "en-US") {
    translation = en.translation;
  } else if (userInfo?.attributes.locale === "es-ES") {
    translation = es.translation;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {translation.avail.modalQuote.rateQuotation}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>
            {translation.avail.modalQuote.surveyInformation}
          </Text>
          <View style={styles.contentRow}>
            <View style={{ width: "40%" }}>
              <View style={styles.contentRow}>
                <View style={[styles.calendarContainer, styles.mr16]}>
                  <View style={[styles.calendarHeader, styles.contentRow]}>
                    <Text style={styles.calendarHeaderText}>
                      {data.checkIn && format(new Date(data.checkIn), "MMM")}
                    </Text>
                    <Text style={styles.calendarHeaderText}>
                      {data.checkOut && format(new Date(data.checkOut), "MMM")}
                    </Text>
                  </View>
                  <View style={[styles.calendarContent, styles.contentRow]}>
                    <View style={{ flexDirection: "column" }}>
                      <Text style={styles.calendarContentText}>
                        {data.checkIn && format(new Date(data.checkIn), "dd")}
                      </Text>
                      <Svg width="39" height="1" viewBox="0 0 39 1">
                        <Path
                          d="M1 0C0.723858 0 0.5 0.223858 0.5 0.5C0.5 0.776142 0.723858 1 1 1V0ZM1 1H39V0H1V1Z"
                          fill="#F0F0F0"
                        />
                      </Svg>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      <Text style={styles.calendarContentText}>
                        {data.checkOut && format(new Date(data.checkOut), "dd")}
                      </Text>
                      <Svg width="39" height="1" viewBox="0 0 39 1">
                        <Path
                          d="M1 0C0.723858 0 0.5 0.223858 0.5 0.5C0.5 0.776142 0.723858 1 1 1V0ZM1 1H39V0H1V1Z"
                          fill="#F0F0F0"
                        />
                      </Svg>
                    </View>
                  </View>
                  <View style={[styles.calendarFooter, styles.contentRow]}>
                    <Text style={styles.calendarFooterText}>
                      {data.checkIn &&
                        format(new Date(data.checkIn), "E.").substring(0, 3)}
                    </Text>
                    <Text style={styles.calendarFooterText}>
                      {data.checkOut &&
                        format(new Date(data.checkOut), "E.").substring(0, 3)}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={[styles.contentRow, { alignItems: "center" }]}>
                    <Svg width="24" height="24" viewBox="0 0 24 24">
                      <Rect width="24" height="24" rx="5" fill="#F4F7FA" />
                      <Path
                        d="M7.11538 8.03215C7.01367 8.07614 6.92296 8.1751 6.88447 8.27681C6.86523 8.32904 6.85423 8.81836 6.85423 9.71452V11.0725H8.16824L8.17924 10.7344C8.19023 10.454 8.20123 10.377 8.25896 10.2616C8.34142 10.0884 8.50636 9.92345 8.6823 9.83548L8.81975 9.76676H10.6066L10.7798 9.86022C10.9722 9.96468 11.0574 10.0526 11.1619 10.2588C11.2251 10.3825 11.2361 10.4403 11.2471 10.7344L11.2581 11.0725H12.1268L12.1378 10.7344C12.1487 10.454 12.1597 10.377 12.2175 10.2616C12.2999 10.0884 12.4649 9.92345 12.6408 9.83548L12.7783 9.76676H14.5651L14.7383 9.86022C14.9307 9.96468 15.0159 10.0526 15.1204 10.2588C15.1836 10.3825 15.1946 10.4403 15.2056 10.7344L15.2166 11.0725H16.5334L16.5251 9.67329C16.5169 8.30705 16.5141 8.27132 16.4591 8.19709C16.4289 8.15586 16.3684 8.09538 16.3272 8.06514C16.2777 8.02666 14.7438 8.00558 11.7254 8.00192C7.99505 7.99642 7.18411 8.00192 7.11538 8.03215Z"
                        fill="#273472"
                      />
                      <Path
                        d="M6.5326 11.9934C6.05153 12.1226 5.66118 12.5295 5.56496 13.005C5.54297 13.1013 5.53473 13.6895 5.54022 14.8304C5.54847 16.4797 5.54847 16.5127 5.6062 16.587C5.71341 16.7326 5.80138 16.7766 5.97456 16.7766C6.14775 16.7766 6.23571 16.7326 6.34292 16.587C6.3924 16.5237 6.4034 16.4632 6.4089 16.2103L6.41989 15.9107H16.9649L16.9759 16.2103C16.9814 16.4632 16.9924 16.5237 17.0419 16.587C17.1491 16.7326 17.2371 16.7766 17.4103 16.7766C17.5835 16.7766 17.6714 16.7326 17.7786 16.587C17.8364 16.5127 17.8364 16.4797 17.8446 14.8304C17.8501 13.6895 17.8419 13.1013 17.8199 13.005C17.7209 12.524 17.3306 12.1199 16.8412 11.9934C16.6103 11.9329 6.75527 11.9357 6.5326 11.9934Z"
                        fill="#273472"
                      />
                    </Svg>
                    <Text style={[styles.ml8, { fontSize: 12 }]}>
                      {data.room} {_.upperFirst(translation.hotel.room)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.contentRow,
                      styles.mt12,
                      { alignItems: "center" },
                    ]}
                  >
                    <Svg width="24" height="24" viewBox="0 0 24 24">
                      <Rect width="24" height="24" rx="5" fill="#F4F7FA" />
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.8646 7.2392C12.018 6.92793 12.3811 6.64825 12.724 6.57382C13.166 6.47683 13.5856 6.60088 13.9126 6.92342C14.181 7.18732 14.2938 7.46024 14.2938 7.84142C14.2938 8.33313 14.0231 8.77296 13.5833 8.98949C13.4142 9.07294 13.1728 9.13384 13.0082 9.13384C12.6856 9.13384 12.336 8.98272 12.0947 8.74138C11.6977 8.34215 11.6075 7.75571 11.8646 7.2392ZM11.7157 9.90753C12.1195 9.46094 12.3112 9.31433 12.6022 9.23313C12.7465 9.19253 13.0555 9.19478 13.2202 9.23764C13.4457 9.29628 13.6758 9.43161 13.9442 9.66619C14.9118 10.512 15.5028 10.8639 16.1366 10.9744C16.3757 11.0173 16.4118 11.0308 16.5155 11.1233C16.7343 11.3127 16.7433 11.642 16.5358 11.8495C16.3937 11.9894 16.2742 12.0142 15.9606 11.9668C15.2817 11.8676 14.8284 11.7029 14.384 11.4007C14.2825 11.3308 14.1968 11.2766 14.1923 11.2812C14.1901 11.2857 14.2216 11.6691 14.2645 12.1337C14.3073 12.6097 14.3344 13.0427 14.3299 13.1262C14.3209 13.2367 14.2961 13.3156 14.2307 13.4465L14.1427 13.6201L14.2555 13.8073C14.6908 14.5314 15.3223 15.7539 15.7825 16.7689C16.008 17.2673 16.017 17.2944 16.017 17.4455C16.0193 17.5583 16.0058 17.6327 15.9719 17.7072C15.8321 18.0117 15.4757 18.1605 15.1644 18.0432C14.9366 17.9575 14.8825 17.8808 14.578 17.2177C14.287 16.5862 13.9081 15.8148 13.6577 15.3479C13.4344 14.9351 13.1841 14.502 13.1683 14.502C13.1503 14.502 12.7578 15.2306 12.2638 16.1824C11.5353 17.5854 11.409 17.8109 11.2894 17.9192C11.0864 18.1019 10.8068 18.1357 10.5699 18.0071C10.3286 17.8741 10.2023 17.6147 10.2429 17.3373C10.2541 17.2651 10.4098 16.9628 10.7955 16.2681C11.0316 15.8413 11.3613 15.2434 11.6068 14.7982C11.6662 14.6905 11.7206 14.5918 11.7676 14.5066L12.2029 13.7104L12.1578 13.6495C12.0879 13.5547 12.0202 13.4126 11.9932 13.3044C11.9796 13.2502 11.9345 12.7991 11.8917 12.3052C11.8488 11.8089 11.8105 11.4007 11.806 11.3984C11.7947 11.3872 11.5736 11.6984 11.4135 11.9533C11.2714 12.1766 11.1045 12.4924 10.9353 12.851C10.8316 13.0743 10.7616 13.1465 10.606 13.2006C10.509 13.2344 10.4842 13.2773 8.7858 16.2726L8.21064 17.2876L8.25349 17.3711C8.3189 17.4951 8.32793 17.6147 8.28507 17.7455C8.20162 17.9959 7.90163 18.1515 7.66931 18.0635C7.40316 17.9643 7.25429 17.6643 7.35579 17.4252L7.38737 17.3508L7.06708 17.1726C6.69718 16.9673 6.625 16.9064 6.625 16.7982C6.625 16.7395 6.81898 16.3787 7.45955 15.2464C7.91742 14.4344 8.32116 13.7442 8.35499 13.7149C8.44972 13.6314 8.53318 13.6585 9.00459 13.9246C9.23916 14.0577 9.44216 14.1615 9.45344 14.1547C9.46697 14.1502 9.61358 13.9066 9.77823 13.6134L10.0782 13.0788L10.0354 13.0179C9.9068 12.8352 9.91582 12.6683 10.0782 12.3142C10.4256 11.5428 11.0007 10.697 11.7157 9.90753ZM7.80915 17.7816C7.96479 17.7816 8.03922 17.5899 7.92644 17.4839C7.81592 17.3801 7.63999 17.4568 7.63999 17.6079C7.63999 17.7117 7.70766 17.7816 7.80915 17.7816Z"
                        fill="#273472"
                      />
                    </Svg>
                    <Text style={[styles.ml8, { fontSize: 12 }]}>
                      {data.adult} {translation.booking.people}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.contentRow, { marginTop: 10 }]}>
                <View style={[styles.dailyBox, styles.mr16]}>
                  <Text style={styles.dailyText}>
                    {translation.avail.modalQuote.dailyRate}
                  </Text>
                  <Text style={[styles.dailyBetweenText, { marginTop: 5 }]}>
                    {translation.avail.modalQuote.between}
                    {` `}
                    {fCurrency(priceRange[0])}
                    {` `}
                    {translation.avail.modalQuote.and}
                    {` `}
                    {fCurrency(priceRange[1])}
                  </Text>
                </View>
                <View style={styles.destinationBox}>
                  <Text style={styles.destinationText}>
                    {translation.avail.modalQuote.destinationOrHotel}
                  </Text>
                  <Text
                    style={[styles.destinationLocationText, { marginTop: 5 }]}
                  >
                    {data.cityName}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ width: "60%", marginLeft: 20, marginRight: 10 }}>
              <Text style={styles.responsibleText}>
                {translation.avail.modalQuote.responsible}
              </Text>
              <View style={styles.responsibleBox}>
                <View style={styles.contentRow}>
                  <View style={{ marginRight: 10, width: "50%" }}>
                    <Text style={styles.responsibleContentTextSecondary}>
                      {translation.booking.salePoint}
                    </Text>
                    <Text style={[styles.responsibleContentText, styles.mb10]}>
                      {data.salePoint}
                    </Text>
                  </View>
                  <View style={{ marginRight: 10, width: "50%" }}>
                    <Text style={styles.responsibleContentTextSecondary}>
                      Email
                    </Text>
                    <Text style={styles.responsibleContentText}>
                      {userInfo && userInfo?.attributes.email}
                    </Text>
                  </View>
                </View>
                <View style={styles.contentRow}>
                  <View style={{ marginRight: 10, width: "50%" }}>
                    <Text style={styles.responsibleContentTextSecondary}>
                      {_.upperFirst(translation.avail.modalQuote.consultant)}
                    </Text>
                    <Text style={[styles.responsibleContentText, styles.mb10]}>
                      {userInfo && userInfo?.attributes.name}
                    </Text>
                  </View>
                  <View style={{ marginRight: 10, width: "50%" }}>
                    <Text style={styles.responsibleContentTextSecondary}>
                      {_.upperFirst(translation.avail.modalQuote.phone)}
                    </Text>
                    <Text style={styles.responsibleContentText}>
                      {userInfo && maskPhone(userInfo?.attributes.phone_number)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Text
            style={[styles.contentTitle, { marginTop: 40, marginBottom: 20 }]}
          >
            {translation.avail.modalQuote.selectedAccommodations}
          </Text>
          {data.rooms.map((room: any, i) => {
            return (
              <View key={i} style={styles.listItem}>
                <View style={styles.contentRow}>
                  <View>
                    {/* <Image style={styles.hotelImage} src={room.hotelImg} /> */}
                    <Image
                      style={styles.hotelImage}
                      src="data:image/png;base64,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"
                    />
                  </View>
                  <View style={[styles.contentRow, { width: "90%" }]}>
                    <View style={{ width: "60%" }}>
                      <Text style={styles.hotelTitle}>{room.hotelName}</Text>
                      <Text style={styles.hotelSecondary}>
                        {_.upperFirst(room.hotelAddress.toLowerCase())}
                      </Text>
                    </View>
                    <View style={{ alignItems: "flex-end", width: "40%" }}>
                      <Text
                        style={{
                          textAlign: "right",
                          fontSize: 10,

                          color: "#727578",
                        }}
                      >
                        {fCurrency(
                          room.averageRates && room.averageRates.amountBeforeTax
                            ? room.averageRates.amountBeforeTax
                            : 0,
                        )}
                        {` ${translation.avail.modalVip.perDay}`}
                      </Text>
                      <Text
                        style={{
                          textAlign: "right",
                          fontSize: 10,

                          color: "#727578",
                          marginTop: 5,
                        }}
                      >
                        {fCurrency(
                          room.averageRates && room.averageRates.totalTaxes
                            ? room.averageRates.totalTaxes
                            : 0,
                        )}
                        {` ${translation.hotel.feesTaxes}`}
                      </Text>
                      <Text
                        style={{
                          textAlign: "right",
                          fontSize: 10,

                          color: "#727578",
                          marginTop: 5,
                        }}
                      >
                        {fCurrency(
                          room.averageRates &&
                            room.averageRates.totalAmountAfterTax
                            ? room.averageRates.totalAmountAfterTax
                            : 0,
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.apartmentName}>
                    {_.upperFirst(room.roomName.toLowerCase())}
                  </Text>
                  <Text style={styles.badNumber}>
                    {room.occupancy} {translation.occupancy}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}

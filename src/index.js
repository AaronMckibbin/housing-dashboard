import { insertHeader, insertFooter, insertHead, insertNavButtons } from "./utils/page-layout.js";
import { readData } from "./utils/read-data.js";
import { insertValue } from "./utils/insert-value.js";
import { latest_year, updateYearSpans, first_year } from "./utils/update-years.js";
import { config } from "./config/config.js";
import { initCookieConsent } from "./utils/cookies.js";

window.addEventListener("DOMContentLoaded", async () => {

    initCookieConsent();
    await insertHead("Home");
    insertHeader();
    insertNavButtons();
    insertFooter();


    // Insert values into homepage cards below

    // Content for card 1

    const [RDLENGLGD_data, RDLENGLGD_meta] = await readData("RDLENGLGD");
    updateYearSpans(RDLENGLGD_data, RDLENGLGD_meta);

    const headline_1_raw = RDLENGLGD_data
        .filter(row => row["Statistic"] == "Total length of roads" && row["Financial Year"] == latest_year && row["Local Government District"] == "Northern Ireland")
        .map(col => col["All Road Type"])[0];

    // BuildR display value: 25,970
    const headline_1 = headline_1_raw.toLocaleString("en-GB", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    insertValue("headline-1-value", headline_1);


    // Content for card 2

    const [SCANNERLGD_data, SCANNERLGD_meta] = await readData("SCANNERLGD");

    const headline_2_raw = SCANNERLGD_data
        .filter(row => row["Statistic"] == "Good" && row["Financial Year"] == "2024/25" && row["Local Government District"] == "Northern Ireland")
        .map(col => col["A Class"])[0];

    // BuildR display value: 80
    const headline_2 = headline_2_raw;
    insertValue("headline-2-value", headline_2);


    // Content for card 3

    const [SDILGD_data, SDILGD_meta] = await readData("SDILGD");

    const headline_3_raw = SDILGD_data
        .filter(row => row["Financial Year"] == "2024/25")
        .map(col => col["Northern Ireland"])[0];

    // BuildR display value: 91,715
    const headline_3 = headline_3_raw.toLocaleString("en-GB", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    insertValue("headline-3-value", headline_3);


    // Content for card 4

    const [SDRLGD_data, SDRLGD_meta] = await readData("SDRLGD");

    const headline_4_raw = SDRLGD_data
        .filter(row => row["Financial Year"] == latest_year)
        .map(col => col["Northern Ireland"])[0];

    // BuildR display value: 81,483
    const headline_4 = headline_4_raw.toLocaleString("en-GB", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    insertValue("headline-4-value", headline_4);


})

import { insertHeader, insertFooter, insertHead, insertNavButtons } from "./utils/page-layout.js";
import { readData } from "./utils/read-data.js";
import { insertValue } from "./utils/insert-value.js";
import { latest_year, updateYearSpans, first_year, last_year } from "./utils/update-years.js";
import { config } from "./config/config.js";
import { insertExpandButtons } from "./utils/expand-buttons.js";
import { downloadButton } from "./utils/download-button.js";
import { dateFormat } from "./utils/date-format.js";
import { populateInfoBoxes } from "./utils/info-boxes.js";
import { initCookieConsent } from "./utils/cookies.js";
import { barChart } from "./charts/bar-chart.js";

window.addEventListener("DOMContentLoaded", async () => {

    initCookieConsent();
    await insertHead("SCANNER");
    insertHeader();
    insertNavButtons();
    insertFooter();
    insertExpandButtons();

    // Insert values into page cards below

    // Content for card 1

    const [SCANNERLGD_data, SCANNERLGD_meta] = await readData("SCANNERLGD");
    updateYearSpans(SCANNERLGD_data, SCANNERLGD_meta);

    const card_1_raw = SCANNERLGD_data
        .filter(row => row["Statistic"] == "Good" &&
row["Financial Year"] == latest_year &&
row["Local Government District"] == "Northern Ireland")
        .map(col => col["A Class"])[0];

    // BuildR display value: 80
    const card_1_value = card_1_raw;
    insertValue("card-1-value", card_1_value);


    // Content for card 2

    const card_2_raw = SCANNERLGD_data
        .filter(row => row["Statistic"] == "Poor" &&
row["Financial Year"] == latest_year &&
row["Local Government District"] == "Northern Ireland")
        .map(col => col["A Class"])[0];

    // BuildR display value: 2
    const card_2_value = card_2_raw;
    insertValue("card-2-value", card_2_value);


    // Content for card 3

    const card_3_raw = SCANNERLGD_data
        .filter(row => row["Statistic"] == "Good" &&
row["Financial Year"] == latest_year &&
row["Local Government District"] == "Northern Ireland")
        .map(col => col["B Class"])[0];

    // BuildR display value: 73
    const card_3_value = card_3_raw;
    insertValue("card-3-value", card_3_value);


    // Content for card 4

    const card_4_raw = SCANNERLGD_data
        .filter(row => row["Statistic"] == "Poor" &&
row["Financial Year"] == latest_year &&
row["Local Government District"] == "Northern Ireland")
        .map(col => col["B Class"])[0];

    // BuildR display value: 4
    const card_4_value = card_4_raw;
    insertValue("card-4-value", card_4_value);


    // Content for card 5

    const card_5_raw = SCANNERLGD_data
        .filter(row => row["Statistic"] == "Good" &&
row["Financial Year"] == latest_year &&
row["Local Government District"] == "Northern Ireland")
        .map(col => col["C Class"])[0];

    // BuildR display value: 61
    const card_5_value = card_5_raw;
    insertValue("card-5-value", card_5_value);


    // Content for card 6

    const card_6_raw = SCANNERLGD_data
        .filter(row => row["Statistic"] == "Poor" &&
row["Financial Year"] == latest_year &&
row["Local Government District"] == "Northern Ireland")
        .map(col => col["C Class"])[0];

    // BuildR display value: 6
    const card_6_value = card_6_raw;
    insertValue("card-6-value", card_6_value);


    // End page card content

    // Insert chart content below

    // Content for chart 1
    // BuildR chart type: bar
    // BuildR matrix: SCANNERLGD

    // BuildR bar chart config start
    const bar_chart_1_data = SCANNERLGD_data
        .filter(row => row["Statistic"] == "Poor" &&
                       row["Local Government District"] == "Northern Ireland" &&
                       row["Local Government District"] == "Northern Ireland");

    barChart({
        data: bar_chart_1_data,
        value: ["A Class", "B Class", "C Class"],
        bars: null,
        categories: "Financial Year",
        canvas_id: "bar-canvas-1",
        expanded_canvas_id: "bar-canvas-1-expanded",
        label_format: "%",
        stacked: false,
        align: "vertical",
        y_label: ""
    });

    const bar_chart_1_query = {
        "Statistic": "Poor",
        "Local Government District": "Northern Ireland",
        "Financial Year": "__LATEST_YEAR__",
        "Road Class": ["A Class", "B Class", "C Class"]
    };

    downloadButton(
        "chart-1-capture",
        "SCANNERLGD",
        dateFormat(SCANNERLGD_meta.updated),
        bar_chart_1_query
    );
    // BuildR bar chart config end

    // Content for chart 2
    // BuildR chart type: bar
    // BuildR matrix: SCANNERLGD

    // BuildR bar chart config start
    const bar_chart_2_data = SCANNERLGD_data
        .filter(row => row["Statistic"] == "Good" &&
                       row["Local Government District"] == "Northern Ireland" &&
                       row["Local Government District"] == "Northern Ireland");

    barChart({
        data: bar_chart_2_data,
        value: ["A Class", "B Class", "C Class"],
        bars: null,
        categories: "Financial Year",
        canvas_id: "bar-canvas-2",
        expanded_canvas_id: "bar-canvas-2-expanded",
        label_format: "%",
        stacked: false,
        align: "vertical",
        y_label: ""
    });

    const bar_chart_2_query = {
        "Statistic": "Good",
        "Local Government District": "Northern Ireland",
        "Financial Year": "__LATEST_YEAR__",
        "Road Class": ["A Class", "B Class", "C Class"]
    };

    downloadButton(
        "chart-2-capture",
        "SCANNERLGD",
        dateFormat(SCANNERLGD_meta.updated),
        bar_chart_2_query
    );
    // BuildR bar chart config end

    // End chart content

    // BuildR info boxes start
    populateInfoBoxes(
        [
            "Definitions",
            "Source",
            "What does the data mean?"
        ],
        [
            // DEFINITIONS BOX
            `A roads - major roads intended to provide large-scale transport links within or between areas.

B roads - roads intended to connect different areas, and to feed traffic between A roads and smaller roads on the network.

C roads - smaller roads intended to connect together unclassified roads with A and B roads.

SCANNER - Surface Condition Assessment for the National Network of Roads.`,

            // SOURCE BOX
            `Publication - https://www.infrastructure-ni.gov.uk/publications/northern-ireland-road-network-and-condition-statistics-2024-25

Data Portal table - https://data.nisra.gov.uk/table/SCANNERLGD

Technical report definitions - https://www.infrastructure-ni.gov.uk/articles/northern-ireland-road-network-and-condition-statistics-technical-report`,

            // DATA MEANING BOX
            `SCANNER - the otuputs from SCANNER are combined to produce a Road Condition Index (RCI). An RCI greater than 100 indicates poor road conditions and a requirement to plan maintenance soon`
        ]
    );
    // BuildR info boxes end


})

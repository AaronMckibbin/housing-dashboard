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
import { plotMap } from "./charts/plot-map.js";
import { pieChart } from "./charts/pie-chart.js";

window.addEventListener("DOMContentLoaded", async () => {

    initCookieConsent();
    await insertHead("Road length");
    insertHeader();
    insertNavButtons();
    insertFooter();
    insertExpandButtons();

    // Insert values into page cards below

    // Content for card 1

    const [RDLENGLGD_data, RDLENGLGD_meta] = await readData("RDLENGLGD");
    updateYearSpans(RDLENGLGD_data, RDLENGLGD_meta);

    const card_1_raw = RDLENGLGD_data
        .filter(row => row["Statistic"] == "Total length of roads" &&
row["Financial Year"] == latest_year &&
row["Local Government District"] == "Northern Ireland")
        .map(col => col["All Road Type"])[0];

    // BuildR display value: 25,970
    const card_1_value = card_1_raw.toLocaleString("en-GB", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    insertValue("card-1-value", card_1_value);


    // Content for card 2

    const card_2_raw = RDLENGLGD_data
        .filter(row => row["Statistic"] == "Total length of roads" &&
row["Financial Year"] == latest_year &&
row["Local Government District"] == "Fermanagh and Omagh")
        .map(col => col["All Road Type"])[0];

    // BuildR display value: 4,001
    const card_2_value = card_2_raw.toLocaleString("en-GB", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    insertValue("card-2-value", card_2_value);


    // Content for card 3

    const card_3_raw = RDLENGLGD_data
        .filter(row => row["Statistic"] == "Total length of roads" &&
row["Financial Year"] == latest_year &&
row["Local Government District"] == "Belfast")
        .map(col => col["All Road Type"])[0];

    // BuildR display value: 1,098
    const card_3_value = card_3_raw.toLocaleString("en-GB", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    insertValue("card-3-value", card_3_value);


    // Content for card 4

    const card_4_raw = RDLENGLGD_data
        .filter(row => row["Statistic"] == "Total length of roads" &&
row["Financial Year"] == latest_year &&
row["Local Government District"] == "Northern Ireland")
        .map(col => col["Unclassified"])[0];

    // BuildR display value: 15,886
    const card_4_value = card_4_raw.toLocaleString("en-GB", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    insertValue("card-4-value", card_4_value);


    // Content for card 5

    const card_5_raw = RDLENGLGD_data
        .filter(row => row["Statistic"] == "Total length of roads" &&
row["Financial Year"] == latest_year &&
row["Local Government District"] == "Northern Ireland")
        .map(col => col["Motorway"])[0];

    // BuildR display value: 115
    const card_5_value = card_5_raw.toLocaleString("en-GB", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    insertValue("card-5-value", card_5_value);


    // Content for card 6

    const card_6_raw = RDLENGLGD_data
        .filter(row => row["Statistic"] == "Percentage of total length of road class" &&
row["Financial Year"] == latest_year &&
row["Local Government District"] == "Fermanagh and Omagh")
        .map(col => col["All Road Type"])[0];

    // BuildR display value: 15
    const card_6_value = card_6_raw;
    insertValue("card-6-value", card_6_value);


    // End page card content

    // Insert chart content below

    // Content for chart 1
    // BuildR chart type: map
    // BuildR matrix: RDLENGLGD

    // BuildR map chart config start
    const map_chart_1_data = RDLENGLGD_data
        .filter(row => row["Statistic"] == "Total length of roads" &&
                       row["Financial Year"] == latest_year &&
                       row["Local Government District"] != "Northern Ireland");

    plotMap({
        elementId: "map-container-1",
        legendId: "map-legend-1",
        data: map_chart_1_data,
        meta: RDLENGLGD_meta,
        area: "Local Government District",
        value: "All Road Type"
    });

    const map_chart_1_query = {
        "Statistic": "Total length of roads",
        "Financial Year": latest_year,
        "Road Class": "All Road Type"
    };

    downloadButton(
        "chart-1-capture",
        "RDLENGLGD",
        dateFormat(RDLENGLGD_meta.updated),
        map_chart_1_query,
        "map"
    );
    // BuildR map chart config end

    // Content for chart 2
    // BuildR chart type: pie
    // BuildR matrix: RDLENGLGD

    // BuildR pie chart config start
    const pie_chart_2_data = RDLENGLGD_data
        .filter(row => row["Statistic"] == "Total length of roads" &&
                       row["Financial Year"] == "2024/25" &&
                       row["Local Government District"] == "Northern Ireland")
        .map(col => ({
            "Motorway": col["Motorway"],
            "A Roads (dual)": col["A Roads (dual)"],
            "A Roads (single)": col["A Roads (single)"],
            "B Roads": col["B Roads"],
            "C Roads": col["C Roads"],
            "Unclassified": col["Unclassified"]
        }))[0];

    pieChart({
        data: pie_chart_2_data,
        canvas_id: "pie-canvas-2",
        expanded_canvas_id: "pie-canvas-2-expanded",
        type: "pie"
    });

    const pie_chart_2_query = {
        "Statistic": "Total length of roads",
        "Financial Year": "2024/25",
        "Local Government District": "Northern Ireland",
        "Road Class": ["Motorway", "A Roads (dual)", "A Roads (single)", "B Roads", "C Roads", "Unclassified"]
    };

    downloadButton(
        "chart-2-capture",
        "RDLENGLGD",
        dateFormat(RDLENGLGD_meta.updated),
        pie_chart_2_query
    );
    // BuildR pie chart config end

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

Unclassified roads - local roads intended for local traffic. `,

            // SOURCE BOX
            `Publication - https://www.infrastructure-ni.gov.uk/publications/northern-ireland-road-network-and-condition-statistics-2024-25

Data Portal table - https://data.nisra.gov.uk/table/RDLENGLGD

Technical report definitions - https://www.infrastructure-ni.gov.uk/publications/northern-ireland-road-network-and-condition-statistics-2024-25`,

            // DATA MEANING BOX
            `Road Length - The data relates to the length of DfI maintained roads each year at 1 April. Data are extracted from the Road Maintenance Client System (RMCS). 

(LGD boundaries may not coincide exactly with boundaries used for road lengths but are a close approximation).`
        ]
    );
    // BuildR info boxes end


})

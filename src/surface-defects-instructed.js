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
import { lineChart } from "./charts/line-chart.js";

window.addEventListener("DOMContentLoaded", async () => {

    initCookieConsent();
    await insertHead("Surface defects instructed");
    insertHeader();
    insertNavButtons();
    insertFooter();
    insertExpandButtons();

    // Insert values into page cards below

    // Content for card 1

    const card_1_value = (123456).toLocaleString();
    insertValue("card-1-value", card_1_value);

    // Content for card 2

    const card_2_value = 5.67;
    insertValue("card-2-value", card_2_value);

    // Content for card 3

    const card_3_value = 2.89;
    insertValue("card-3-value", card_3_value);

    // Content for card 4

    const card_4_value = (9876).toLocaleString();
    insertValue("card-4-value", card_4_value);

    // Content for card 5

    const card_5_area = "Example Region A";
    insertValue("card-5-area", card_5_area);

    const card_5_value = (45678).toLocaleString();
    insertValue("card-5-value", card_5_value);

    // Content for card 6

    const card_6_area = "Example Region B";
    insertValue("card-6-area", card_6_area);

    const card_6_value = (12345).toLocaleString();
    insertValue("card-6-value", card_6_value);

    // End page card content

    // Insert chart content below

    // Content for chart 1
    // BuildR chart type: line
    // BuildR matrix: SDILGD
    const [SDILGD_data, SDILGD_meta] = await readData("SDILGD");

    // BuildR line chart config start
    updateYearSpans(SDILGD_data, SDILGD_meta);

    let line_chart_1_years = SDILGD_data
        .map(col => col["Financial Year"]);

    line_chart_1_years = [...new Set(line_chart_1_years)];

    line_chart_1_years = line_chart_1_years.slice(-5);

    const line_chart_1_lines = [
        SDILGD_data
            .filter(row => line_chart_1_years.includes(row["Financial Year"]))
            .map(col => col["Northern Ireland"])
    ];

    const line_chart_1_labels = ["Surface defects instructed"];

    lineChart({
        years: line_chart_1_years,
        lines: line_chart_1_lines,
        labels: line_chart_1_labels,
        unit: "",
        canvas_id: "line-canvas-1",
        expanded_canvas_id: "line-canvas-1-expanded",
        showPoints: true
    });

    const line_chart_1_query = {
        "Financial Year": line_chart_1_years,
        "Local Government District": "Northern Ireland"
    };

    downloadButton(
        "chart-1-capture",
        "SDILGD",
        dateFormat(SDILGD_meta.updated),
        line_chart_1_query
    );
    // BuildR line chart config end

    // Content for chart 2
    // BuildR placeholder chart start

    // Bar chart example - replace with dynamic data as needed
    const bar_chart_data = [
        {
            "category": "Category A",
            "Type 1": 10,
            "Type 2": 15,
            "Type 3": 3
        },
        {
            "category": "Category B",
            "Type 1": 5,
            "Type 2": 7,
            "Type 3": 2
        }

    ]

    barChart({
       data: bar_chart_data,
       value: ["Type 1", "Type 2", "Type 3"],
       categories: "category",
       canvas_id: "bar-example",
       expanded_canvas_id: "bar-example-expanded",
       label_format: ",",
       y_label: "Value"
    });
    // BuildR placeholder chart end

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
            ``,

            // SOURCE BOX
            ``,

            // DATA MEANING BOX
            ``
        ]
    );
    // BuildR info boxes end


})

figma.showUI(__html__, { width: 230, height: 143 });

// Get and set history scale
figma.clientStorage.getAsync("quick_ios_export_history_scale").then((res) => {
    var historyScale = res;
    if (historyScale == undefined) {
        historyScale = 2;
    };
    console.log("设置历史尺寸：" + historyScale);
    figma.ui.postMessage({ type: "change_input_radio", value: historyScale });
});

// event listener
figma.ui.onmessage = message => {
    if (message.value == 0) {
        figma.notify("Please select your artboard width", { timeout: 1000 })
        return;
    }
    for (var _i = 0, _a = figma.currentPage.selection; _i < _a.length; _i++) {
        var node = _a[_i];
        console.log(node);
        node.exportSettings = [{
                constraint: {
                    type: "SCALE",
                    value: 1 / message.value * 2
                },
                format: "PNG",
                suffix: "@2x"
            },
            {
                constraint: {
                    type: "SCALE",
                    value: 1 / message.value * 3
                },
                format: "PNG",
                suffix: "@3x"
            }
        ]
        node.exportAsync();
    }
    figma.clientStorage.setAsync("quick_ios_export_history_scale", message.value);
    figma.notify("Success", { timeout: 1000 })
}


// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
// figma.closePlugin();
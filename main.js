(() => {
  //"use strict";
  //  color_wire("#800040", js);
  function color_wire(color, js) {
    if (!js || !js.wire) return;
    for (let gge in js.wire) {
      js.wire[gge].strokeColor = color;
    }
  }

  // color_junction("#ff00ff", js);
  function color_junction(color, js) {
    if (!js || !js.junction) return;
    for (let gge in js.junction) {
      js.junction[gge].fillColor = color;
    }
  }

  // color_symbol_rect('#0000ff', js);
  function color_symbol_rect(clr, js) {
    if (!js || !js.schlib) return;
    for (const pair of Object.entries(js.schlib)) {
      if (pair[0].includes("frame_lib_")) continue;
      let part = pair[1];
      for (const p of Object.entries(part)) {
        if (p[0] === "rect") {
          let rects = p[1].rect;
          if (!rects) continue;
          for (const r of Object.entries(rects)) {
            if (r[1] && r[1].strokeColor) {
              r[1].strokeColor = clr;
            }
          }
        }
      }
    }
  }

  // color_symbol_rect('#0000ff', js);
  function color_symbol_rect2(clr, js) {
    for (let item in js) {
      if (item == "schlib") {
        for (var gge in js.schlib) {
          if (gge.toLowerCase().includes("frame_lib_")) continue;
          for (var gge_item in js.schlib[gge]) {
            if (gge_item == "rect") {
              for (let rect_gge in js.schlib[gge][gge_item]) {
                for (let rect_gge_item in js.schlib[gge][gge_item][rect_gge]) {
                  if (rect_gge_item == "strokeColor") {
                    js.schlib[gge][gge_item][rect_gge][rect_gge_item] = clr;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // rectify_symbol_rect(js);
  function rectify_symbol_rect(js) {
    for (let item in js) {
      if (item == "schlib") {
        for (var gge in js.schlib) {
          if (gge.toLowerCase().includes("frame_lib_")) continue;
          for (var gge_item in js.schlib[gge]) {
            if (gge_item == "rect") {
              for (let rect_gge in js.schlib[gge][gge_item]) {
                for (let rect_gge_item in js.schlib[gge][gge_item][rect_gge]) {
                  if (rect_gge_item == "rx") {
                    let r = parseFloat(js.schlib[gge][gge_item][rect_gge].rx);
                    if (r != NaN && r <= 2) {
                      js.schlib[gge][gge_item][rect_gge].rx = "";
                      js.schlib[gge][gge_item][rect_gge].ry = "";
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  function schlib_pin_item_order(js) {
    for (const obj of Object.entries(js.schlib)) {
      let part_obj = obj[1];

      console.log(part_obj.itemOrder);

      console.log(part_obj.pin);
    }

    // rectify_symbol_rect(js);
    for (let item in js) {
      if (item == "schlib") {
        for (var gge in js.schlib) {
          if (gge.toLowerCase().includes("frame_lib_")) continue;
          for (var gge_item in js.schlib[gge]) {
            if (gge_item == "rect") {
              for (let rect_gge in js.schlib[gge][gge_item]) {
                for (let rect_gge_item in js.schlib[gge][gge_item][rect_gge]) {
                  if (rect_gge_item == "rx") {
                    let r = parseFloat(js.schlib[gge][gge_item][rect_gge].rx);
                    if (r != NaN && r <= 2) {
                      js.schlib[gge][gge_item][rect_gge].rx = "";
                      js.schlib[gge][gge_item][rect_gge].ry = "";
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  /// if (!js.hasOwnProperty("schlib") || !js.schlib.hasOwnProperty("rect")) return;
  function normalize_rect(js) {
    if (!js.hasOwnProperty("schlib")) return;

    for (const pair_of_gge_and_part of Object.entries(js.schlib)) {
      let i_part = pair_of_gge_and_part[1];
      if (i_part.hasOwnProperty("rect")) {
        for (const pair_of_gge_and_rect of Object.entries(i_part.rect)) {
          let i_rect = pair_of_gge_and_rect[1];

          i_rect["fillColor"] = "";
          i_rect["strokeWidth"] = "1";
        }
      }
    }
  }

  function delete_symbol_pin1_ellipse(js) {
    // delete_symbol_pin1mark(js);
    for (let item in js) {
      if (item == "schlib") {
        for (var gge in js.schlib) {
          if (gge.toLowerCase().includes("frame_lib_")) continue;
          for (var gge_item in js.schlib[gge]) {
            if (gge_item == "ellipse") {
              for (let it_gge in js.schlib[gge][gge_item]) {
                try {
                  if (
                    js.schlib[gge][gge_item][it_gge].fillColor == "#880000" &&
                    js.schlib[gge][gge_item][it_gge].strokeColor == "#880000" &&
                    js.schlib[gge][gge_item][it_gge].rx == "1.5" &&
                    js.schlib[gge][gge_item][it_gge].ry == "1.5" &&
                    js.schlib[gge][gge_item][it_gge].strokeWidth == "1"
                  ) {
                    delete js.schlib[gge][gge_item][it_gge];

                    console.log("%s ellipse deleted", js.schlib[gge][gge_item][it_gge]);
                  }
                } catch (error) {}
              }
            }

            if (Object.keys(js.schlib[gge][gge_item]).length == 0) {
              delete js.schlib[gge].ellipse;
              console.log("no more ellipse");
            }
          }
        }
      }
    }
  }

  function color_symbol_pin(pin_clr, name_clr, num_clr, js) {
    // color_symbol_pin("#FF0000","#000080","#000000",js);
    for (let item in js) {
      if (item == "schlib") {
        for (var gge in js.schlib) {
          for (var gge_item in js.schlib[gge]) {
            if (gge_item == "pin") {
              for (let pin_gge in js.schlib[gge][gge_item]) {
                for (let pin_gge_item in js.schlib[gge][gge_item][pin_gge]) {
                  if (pin_gge_item == "path") {
                    js.schlib[gge][gge_item][pin_gge][pin_gge_item]["pinColor"] = pin_clr;
                  } else if (pin_gge_item == "name") {
                    js.schlib[gge][gge_item][pin_gge][pin_gge_item]["fontFamily"] = "Arial Narrow";
                    if (js.schlib[gge][gge_item][pin_gge][pin_gge_item]["fillColor"].toLowerCase() != "#ff0000" && js.schlib[gge][gge_item][pin_gge][pin_gge_item]["fillColor"] != "#000000") {
                      js.schlib[gge][gge_item][pin_gge][pin_gge_item]["fillColor"] = name_clr;
                    }
                  } else if (pin_gge_item == "num") {
                    //if (js.schlib[gge][gge_item][pin_gge][pin_gge_item]['fillColor'].toLowerCase() != "#ff0000" &&
                    // js.schlib[gge][gge_item][pin_gge][pin_gge_item]['fillColor'] != "#000000")
                    js.schlib[gge][gge_item][pin_gge][pin_gge_item]["fillColor"] = num_clr;
                    js.schlib[gge][gge_item][pin_gge][pin_gge_item]["fontFamily"] = "Arial Narrow";
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  function push_back_symbols_pin_order(js) {
    for (const obj of Object.entries(js.schlib)) {
      let part = obj[1];

      if (part.hasOwnProperty("pin") && part.hasOwnProperty("itemOrder")) {
        let itemOrder = part.itemOrder;
        let pin_gids = [];
        let result = [];
        for (const pinObj of Object.entries(part.pin)) {
          pin_gids.push(pinObj[0]);
          result.push(pinObj[0]);
        }

        for (const x of itemOrder) {
          if (!pin_gids.includes(x)) result.push(x);
        }
        itemOrder.length = 0;
        for (const x of result) {
          itemOrder.push(x);
        }
      }
    }
  }

  function push_back_symbols_pin_order1(js) {
    for (const pair of Object.entries(js.schlib)) {
      let part = pair[1];

      if (part && part.pin && part.itemOrder) {
        let itemOrder = part.itemOrder;
        let pin_gids = [];
        let result = [];
        for (const pinObj of Object.entries(part.pin)) {
          pin_gids.push(pinObj[0]);
          result.push(pinObj[0]);
        }

        for (const x of itemOrder) {
          if (!pin_gids.includes(x)) result.push(x);
        }
        itemOrder.length = 0;
        for (const x of result) {
          itemOrder.push(x);
        }
      }
    }
  }
  function push_back_symbols_pin_order2(js) {
    for (const obj of Object.entries(js.schlib)) {
      let part = obj[1];

      if (part.hasOwnProperty("pin") && part.hasOwnProperty("itemOrder")) {
        let itemOrder = part.itemOrder;
        let pin_gids = [];
        for (const pinObj of Object.entries(part.pin)) {
          pin_gids.push(pinObj[0]);
        }

        let result = [...new Set(pin_gids.concat(itemOrder))];

        itemOrder = [...result];
      }
    }
  }

  function color_symbol_poly(poly_clr, js) {
    for (let item in js) {
      if (item == "schlib") {
        for (var gge in js.schlib) {
          for (var gge_item in js.schlib[gge]) {
            if (gge_item == "polygon" || gge_item == "polyline" || gge_item == "path" || gge_item == "arc") {
              for (let gge_ploy in js.schlib[gge][gge_item]) {
                for (let ploy_gge_item in js.schlib[gge][gge_item][gge_ploy]) {
                  if (ploy_gge_item == "strokeColor") {
                    js.schlib[gge][gge_item][gge_ploy][ploy_gge_item] = poly_clr;
                  } else if (ploy_gge_item == "fillColor") {
                    js.schlib[gge][gge_item][gge_ploy][ploy_gge_item] = "none";
                  }
                }
              }
            } else if (gge_item == "ellipse") {
              for (let gge_ellipse in js.schlib[gge][gge_item]) {
                //for (let ellipse_gge_item in js.schlib[gge][gge_item][gge_ellipse]) {
                if (
                  !(
                    js.schlib[gge][gge_item][gge_ellipse].fillColor == "#880000" &&
                    js.schlib[gge][gge_item][gge_ellipse].strokeColor == "#880000" &&
                    js.schlib[gge][gge_item][gge_ellipse].rx == "1.5" &&
                    js.schlib[gge][gge_item][gge_ellipse].ry == "1.5" &&
                    js.schlib[gge][gge_item][gge_ellipse].strokeWidth == "1"
                  )
                ) {
                  js.schlib[gge][gge_item][gge_ellipse].strokeColor = poly_clr;
                }
                //}
              }
            }
          }
        }
      }
    }
  }

  function annotation_font(js, footFontSize) {
    for (let item in js) {
      if (item == "schlib") {
        for (var gge in js.schlib) {
          for (var gge_item in js.schlib[gge]) {
            if (gge_item == "annotation") {
              for (let gge_annotation in js.schlib[gge][gge_item]) {
                // each item of ggexxx
                if (js.schlib[gge][gge_item][gge_annotation].mark == "N") {
                  js.schlib[gge][gge_item][gge_annotation].fontFamily = "Courier New";
                  js.schlib[gge][gge_item][gge_annotation].fontStyle = "normal";
                  js.schlib[gge][gge_item][gge_annotation].fontWeight = "bolder";
                  js.schlib[gge][gge_item][gge_annotation].fillColor = "#000080";
                  js.schlib[gge][gge_item][gge_annotation].fontSize = "6.5pt";
                } else if (js.schlib[gge][gge_item][gge_annotation].mark == "P") {
                  js.schlib[gge][gge_item][gge_annotation].fontFamily = "Courier New";
                  js.schlib[gge][gge_item][gge_annotation].fontStyle = "normal";
                  js.schlib[gge][gge_item][gge_annotation].fontWeight = "bolder";
                  js.schlib[gge][gge_item][gge_annotation].fillColor = "#000080";
                  js.schlib[gge][gge_item][gge_annotation].fontSize = "6.5pt";
                } else if (js.schlib[gge][gge_item][gge_annotation].mark == "PK") {
                  js.schlib[gge][gge_item][gge_annotation].fontFamily = "Courier New";
                  js.schlib[gge][gge_item][gge_annotation].fontStyle = "normal";
                  js.schlib[gge][gge_item][gge_annotation].fontWeight = "normal";
                  js.schlib[gge][gge_item][gge_annotation].fillColor = "#000080";
                  js.schlib[gge][gge_item][gge_annotation].fontSize = footFontSize;
                }
              }
            }
          }
        }
      }
    }
  }

  function annotation_font_AA(js, font_name, FontSize, footFontSize) {
    for (let item in js) {
      if (item == "schlib") {
        for (var gge in js.schlib) {
          for (var gge_item in js.schlib[gge]) {
            if (gge_item == "annotation") {
              for (let gge_annotation in js.schlib[gge][gge_item]) {
                // each item of ggexxx
                if (js.schlib[gge][gge_item][gge_annotation].mark == "N") {
                  js.schlib[gge][gge_item][gge_annotation].fontFamily = font_name;
                  js.schlib[gge][gge_item][gge_annotation].fontStyle = "normal";
                  js.schlib[gge][gge_item][gge_annotation].fontWeight = "bolder";
                  js.schlib[gge][gge_item][gge_annotation].fillColor = "#000080";
                  js.schlib[gge][gge_item][gge_annotation].fontSize = FontSize;
                } else if (js.schlib[gge][gge_item][gge_annotation].mark == "P") {
                  js.schlib[gge][gge_item][gge_annotation].fontFamily = font_name;
                  js.schlib[gge][gge_item][gge_annotation].fontStyle = "normal";
                  js.schlib[gge][gge_item][gge_annotation].fontWeight = "bolder";
                  js.schlib[gge][gge_item][gge_annotation].fillColor = "#000080";
                  js.schlib[gge][gge_item][gge_annotation].fontSize = FontSize;
                } else if (js.schlib[gge][gge_item][gge_annotation].mark == "PK") {
                  js.schlib[gge][gge_item][gge_annotation].fontFamily = font_name;
                  js.schlib[gge][gge_item][gge_annotation].fontStyle = "normal";
                  js.schlib[gge][gge_item][gge_annotation].fontWeight = "normal";
                  js.schlib[gge][gge_item][gge_annotation].fillColor = "#000080";
                  js.schlib[gge][gge_item][gge_annotation].fontSize = footFontSize;
                }
              }
            }
          }
        }
      }
    }
  }

  function annotation_font_AA1(js, font_name, desinatorFontSize, commentFontSize, footFontSize) {
    if (!js || !js.schlib) return;

    for (const pair of Object.entries(js.schlib)) {
      if (pair[0].toLowerCase().includes("frame_lib_")) {
        continue;
      }

      let part = pair[1];
      if (!part) continue;

      for (const p of Object.entries(part)) {
        if (p[0] == "annotation") {
          if (!p[1]) continue;
          let annos = p[1];

          for (const pa of Object.entries(annos)) {
            let a = pa[1];

            if (a && a.mark) {
              if (a.mark == "P") {
                a.fontFamily = font_name;
                a.fontSize = desinatorFontSize;
                a.fontStyle = "normal";
                a.fontWeight = "bolder";
                a.fillColor = "#000080";
              } else if (a.mark == "N") {
                a.fontFamily = font_name;
                a.fontSize = commentFontSize;
                a.fontStyle = "normal";
                a.fontWeight = "regular";
                a.fillColor = "#000080";
              } else if (a.mark == "PK") {
                a.fontFamily = font_name;
                a.fontSize = footFontSize;
                a.fontStyle = "normal";
                a.fontWeight = "regular";
                a.fillColor = "#000080";
              }
            }
          }
        }
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  function get_comment_obj(part) {
    for (const obj of Object.entries(part.annotation)) {
      if ("N" == obj[1].mark) return obj[1];
    }
    return null;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  function get_designator_obj(part) {
    for (const obj of Object.entries(part.annotation)) {
      if ("P" == obj[1].mark) return obj[1];
    }
    return null;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  function get_package_obj(part) {
    for (const obj of Object.entries(part.annotation)) {
      if ("PK" == obj[1].mark) return obj[1];
    }
    return null;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  function align_package_position(js) {
    for (const obj of Object.entries(js.schlib)) {
      let part_obj = obj[1];

      let comment = get_comment_obj(part_obj);
      let designator = get_designator_obj(part_obj);
      let package = get_package_obj(part_obj);

      if (package != null) {
        package.x = comment.x;

        let cy = Number(comment.y);
        let dy = Number(designator.y);
        let py = Number(package.y);

        let rotation = part_obj.head.rotation;
        if (rotation == "90" || rotation == "270") {
          let n = cy + (cy - dy) / 2;
          package.y = n.toPrecision();
        } else if (Math.abs(py - dy) < 10) {
          let n = cy + (cy - dy) / 2;
          package.y = n.toPrecision();
        }
      }
    }
  }

  function format_annotation(js) {
    if (!js || !js.schlib) return;

    for (const obj of Object.entries(js.schlib)) {
      let part_obj = obj[1];

      if (!part_obj) continue;

      let designator = get_designator_obj(part_obj);
      let comment = get_comment_obj(part_obj);
      let package = get_package_obj(part_obj);

      if (designator) {
        designator.textAnchor = "start";
        designator.dominantBaseline = "";
      }
      if (comment) {
        comment.textAnchor = "start";
        comment.dominantBaseline = "";
      }
      if (package) {
        package.textAnchor = "start";
        package.dominantBaseline = "";
      }
    }
  }

  function format_net_label(js) {
    if (js && js.netlabel) {
      for (const pair of Object.entries(js.netlabel)) {
        let o = pair[1];

        if (o) {
          //o.fontFamily = "Fira Code SemiBold";
          o.fontFamily = "AFiraCodeBold";
          o.fontSize = "6.5pt";
        }
      }
    }
  }

  function format_net_label1(js, font_name) {
    if (js && js.netlabel) {
      for (const pair of Object.entries(js.netlabel)) {
        let o = pair[1];

        if (o) {
          o.fontFamily = font_name;
          o.fontSize = "6.5pt";
        }
      }
    }
  }

  function format_netflag(js) {
    if (js && js.netflag) {
      for (const pair of Object.entries(js.netflag)) {
        let o = pair[1];
        var p;
        if (o && o.mark) {
          //o.mark.fontFamily = "Fira Code SemiBold";
          o.mark.fontFamily = "AFiraCodeBold";
          if (o.mark.netFlagString.toLowerCase().includes("gnd")) {
            o.mark.fontSize = "3pt";
          } else {
            o.mark.fontSize = "6.5pt";
          }
        }
      }
    }
  }

  function format_netflag1(js, font_name) {
    if (js && js.netflag) {
      for (const pair of Object.entries(js.netflag)) {
        let o = pair[1];
        if (o && o.mark) {
          o.mark.fontFamily = font_name;
          if (o.mark.netFlagString.toLowerCase().includes("gnd")) {
            o.mark.fontSize = "3pt";
          } else {
            o.mark.fontSize = "6.5pt";
          }
        }
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  function get_json_source() {
    return api("getSource", {
      type: "json",
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  function apply_json_source(js) {
    return api("applySource", {
      source: js,
      createNew: false,
    });
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  api("createCommand", {
    ["extension-StyleSch-cmd.orcad"]: function () {
      var js = get_json_source();

      color_wire("#800040", js);
      color_junction("#FF00FF", js);
      color_symbol_rect("#0000FF", js);
      rectify_symbol_rect(js);
      normalize_rect(js);
      delete_symbol_pin1_ellipse(js);
      color_symbol_pin("#FF0000", "#004080", "#000000", js);
      color_symbol_poly("#0000FF", js);
      push_back_symbols_pin_order(js);

      format_annotation(js);
      annotation_font_AA(js, "AA", "6.5pt", "3pt");

      apply_json_source(js);

      api("select", { ids: js.itemOrder });
      api("rotate", { ids: js.itemOrder, degree: 180 });
      api("rotate", { ids: js.itemOrder, degree: 180 });

      js = get_json_source();

      align_package_position(js);
      format_net_label(js);
      format_netflag(js);
      apply_json_source(js);
    },

    ["extension-StyleSch-cmd.OrcadNarrowArial"]: function () {
      var js = get_json_source();

      color_wire("#800040", js);
      color_junction("#FF00FF", js);
      color_symbol_rect("#0000FF", js);

      ///   -------------------------------
      rectify_symbol_rect(js);
      normalize_rect(js);
      delete_symbol_pin1_ellipse(js);
      color_symbol_pin("#FF0000", "#004080", "#000000", js);
      color_symbol_poly("#0000FF", js);
      push_back_symbols_pin_order(js);

      format_annotation(js);
      annotation_font_AA1(js, "Arial Narrow", "5.5pt", "4.5pt", "2pt");

      apply_json_source(js);

      api("select", { ids: js.itemOrder });
      api("rotate", { ids: js.itemOrder, degree: 180 });
      api("rotate", { ids: js.itemOrder, degree: 180 });

      js = get_json_source();

      align_package_position(js);

      format_net_label1(js, "Arial Narrow");
      format_netflag1(js, "Arial Narrow");

      apply_json_source(js);
    },
    ["extension-StyleSch-cmd.Log"]: function () {
      var js = get_json_source();

      console.log(js);
    },
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  api("createToolbarButton", {
    fordoctype: "sch,schlib",
    menu: [
      {
        text: "ORCAD",
        cmd: "extension-StyleSch-cmd.orcad",
      },
      {
        text: "Orcad Narrow Arial",
        cmd: "extension-StyleSch-cmd.OrcadNarrowArial",
      },
      {
        text: "Log Out Json",
        cmd: "extension-StyleSch-cmd.Log",
      },
    ],
  });
})();

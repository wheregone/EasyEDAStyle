(() => {
  "use strict";

  function color_wire(color, js) {
    //  color_wire("#800040", js);
    for (let item in js) {
      if (item == "wire") {
        for (let gge in js.wire) {
          js.wire[gge].strokeColor = color;
        }
      }
    }
  }

  function color_junction(color, js) {
    // color_junction("#ff00ff", js);
    for (let item in js) {
      if (item == "junction") {
        for (let gge in js.junction) {
          js.junction[gge].fillColor = color;
        }
      }
    }
  }

  function color_symbol_rect(clr, js) {
    // color_symbol_rect('#0000ff', js);
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

  function rectify_symbol_rect(js) {
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
                  if (js.schlib[gge][gge_item][it_gge].fillColor == "#880000" && js.schlib[gge][gge_item][it_gge].strokeColor == "#880000" && js.schlib[gge][gge_item][it_gge].rx == "1.5" && js.schlib[gge][gge_item][it_gge].ry == "1.5" && js.schlib[gge][gge_item][it_gge].strokeWidth == "1") {
                    delete js.schlib[gge][gge_item][it_gge];

                    console.log("%s ellips deleted", js.schlib[gge][gge_item][it_gge]);
                  }
                } catch (error) {}
              }
            }

            if (Object.keys(js.schlib[gge][gge_item]).length == 0) {
              delete js.schlib[gge].ellipse;
              console.log("no more ellips");
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
                    if (js.schlib[gge][gge_item][pin_gge][pin_gge_item]["fillColor"].toLowerCase() != "#ff0000" && js.schlib[gge][gge_item][pin_gge][pin_gge_item]["fillColor"] != "#000000") js.schlib[gge][gge_item][pin_gge][pin_gge_item]["fillColor"] = name_clr;
                  } else if (pin_gge_item == "num") {
                    //if (js.schlib[gge][gge_item][pin_gge][pin_gge_item]['fillColor'].toLowerCase() != "#ff0000" &&
                    // js.schlib[gge][gge_item][pin_gge][pin_gge_item]['fillColor'] != "#000000")
                    js.schlib[gge][gge_item][pin_gge][pin_gge_item]["fillColor"] = num_clr;
                  }
                }
              }
            }
          }
        }
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
                if (!(js.schlib[gge][gge_item][gge_ellipse].fillColor == "#880000" && js.schlib[gge][gge_item][gge_ellipse].strokeColor == "#880000" && js.schlib[gge][gge_item][gge_ellipse].rx == "1.5" && js.schlib[gge][gge_item][gge_ellipse].ry == "1.5" && js.schlib[gge][gge_item][gge_ellipse].strokeWidth == "1")) {
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

  function align_package_position(js) {
    for (let obj of Object.entries(js.schlib)) {
      let part_gid = obj[0];
      let part_obj = obj[1];

      let comment = get_comment_obj(part_obj);
      let designator = get_designator_obj(part_obj);
      let package = get_package_obj(part_obj);

      if (package == null) continue;

      package.x = designator.x;
      package.y = comment.y + comment.y - designator.y;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  function get_json_source() {
    return api("getSource", { type: "json" });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  function apply_json_source(js) {
    return api("applySource", { source: js, createNew: false });
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  api("createCommand", {
    ["extension-StyleSch-cmd.orcad"]: function () {
      var js = get_json_source();

      color_wire("#800040", js);
      color_junction("#FF00FF", js);
      color_symbol_rect("#0000FF", js);
      rectify_symbol_rect(js);
      delete_symbol_pin1_ellipse(js);
      //color_symbol_pin(pin_clr, name_clr, num_clr, js)
      color_symbol_pin("#FF0000", "#004080", "#000000", js);
      color_symbol_poly("#0000FF", js);

      apply_json_source(js);
    },
    ["extension-StyleSch-cmd.FontAnnotate4"]: function () {
      var js = get_json_source();

      annotation_font(js, "4pt");

      apply_json_source(js);
    },
    ["extension-StyleSch-cmd.FontAnnotate3"]: function () {
      var js = get_json_source();

      annotation_font(js, "3pt");

      apply_json_source(js);
    },
    ["extension-StyleSch-cmd.AlignPackageString"]: function () {
      var js = get_json_source();

      align_package_position(js);

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
        text: "Font Annotate 3",
        cmd: "extension-StyleSch-cmd.FontAnnotate3",
      },
      {
        text: "Font Annotate 4",
        cmd: "extension-StyleSch-cmd.FontAnnotate4",
      },
      {
        text: "Align Package String",
        cmd: "extension-StyleSch-cmd.AlignPackageString",
      },
      {
        text: "Log Out Json",
        cmd: "extension-StyleSch-cmd.Log",
      },
    ],
  });
})();

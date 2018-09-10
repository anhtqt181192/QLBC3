
// event page -------------------------------------------------------





$(document).ready(function () {
    locationHashChanged();
    window.onhashchange = locationHashChanged;
    resize()
    treeClick()
    swapGender()
    $(".form_datetime").datepicker({ dateFormat: 'dd/mm/yy' });
    $("#tree-view > li:first-child").addClass("active")
    $("#ddlDieuLuat").change(function () { dlChange() })
    $(document).on('mousemove', 'textarea', function (e) {
        var a = $(this).offset().top + $(this).outerHeight() - 16, b = $(this).offset().left + $(this).outerWidth() - 16; $(this).css({ cursor: e.pageY > a && e.pageX > b ? "s-resize" : "" });
    });
    $("#person_create").val(localStorage['person_create']);
    changeUnitPagePrint();
})
$(window).resize(resize)
function locationHashChanged() {
    var hash = window.location.hash.replace(/^#/, '');
    if (hash.indexOf('active-tab') != -1) {
        $(".card-block.tab-hide").each(function () {
            if ($(this).attr("id") == hash) {
                $(this).addClass("active");
                changeNavTabs($(this).attr("id"))
                resize()
            }
            else {
                $(this).removeClass("active");
            }
        });
    }
}

function resize() {
    $(".mini-layout.left").css("height", $("#active-tab1").innerHeight() - 122)
    $(".mini-layout.right").css("height", $("#active-tab1").innerHeight() - 122)
    $(".mini-layout.right").css("width", $("#active-tab1").innerWidth() - 200)
    $("body").css("min-height", $(window).innerHeight())
}
function treeClick() {
    $("#tree-view > li ").click(function () {
        if ($(this).hasClass("active"))
            return
        else {
            $("#tree-view > li.active ").removeClass("active");
            $(this).addClass("active")
            $("#ddlDieuLuat").val($(this).attr("data-value"))
        }
    })
    check_ddlDieuLuat()
}
function swapGender() {
    $(".radio_button").click(function () {
        if ($(this).attr("id") == "radio_nam") {
            $("#radio_nu").find("i").addClass("fa-circle-o");
            $("#radio_nu").find("i").removeClass("fa-check-circle");
            $(this).find("i").removeClass("fa-circle-o");
            $(this).find("i").addClass("fa-check-circle");
            $("#txt4").val("Nam")
        }
        if ($(this).attr("id") == "radio_nu") {
            $("#radio_nam").find("i").addClass("fa-circle-o");
            $("#radio_nam").find("i").removeClass("fa-check-circle");
            $(this).find("i").removeClass("fa-circle-o");
            $(this).find("i").addClass("fa-check-circle");
            $("#txt4").val("Nữ")
        }
    })
    $(".radio_button_1").click(function () {
        if ($(this).attr("id") == "radio_nam_1") {
            $("#radio_nu_1").find("i").addClass("fa-circle-o");
            $("#radio_nu_1").find("i").removeClass("fa-check-circle");
            $(this).find("i").removeClass("fa-circle-o");
            $(this).find("i").addClass("fa-check-circle");
        }
        if ($(this).attr("id") == "radio_nu_1") {
            $("#radio_nam_1").find("i").addClass("fa-circle-o");
            $("#radio_nam_1").find("i").removeClass("fa-check-circle");
            $(this).find("i").removeClass("fa-circle-o");
            $(this).find("i").addClass("fa-check-circle");
        }
    })
}

function changeUnitPagePrint() {
    $("span.span-plus").click(function () {
        var unit = parseInt($(this).parent().find("input").val());
        console.log(unit)
        $(this).parent().find("input").val(unit + 1);
    })
    $("span.span-minus").click(function () {
        var unit = parseInt($(this).parent().find("input").val());
        $(this).parent().find("input").val(unit - 1);
    })
}

function exportToJsonFile(jsonData) {
    var dataStr = JSON.stringify(jsonData);
    var dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    var exportFileDefaultName = 'data.json';

    var linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

function changeNavTabs(id) {
    $(".custom-navbar .nav-link").each(function () {
        if ($(this).attr("href") == "#" + id) {

            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    })
}
function closePanel() {
    var w = $(".panel-right").width();
    $(".panel-right").animate({
        opacity: 0,
        width: "0px",
    }, 200, function () {
        $(".panel-right").css("display", "none")
    });
}
function showPanel() {
    $(".panel-right").css("display", "block")
    var w = $(".panel-right").width();
    $(".panel-right").animate({
        opacity: 1,
        width: "350px",
    }, 200, function () {
    });
}
function closePanelBottom() {
    var w = $(".panel-bottom").width();
    $(".panel-bottom").animate({
        height: "0px",
    }, 200, function () {
        $(".panel-bottom > table").css("display", "none")
        $(".panel-bottom").attr("onclick", "showPanelBottom();")
        $(".btn-close-panel-bottom").html('<i class="fa fa-arrow-up"></i>')
    });
}
function showPanelBottom() {
    $(".panel-bottom").animate({
        height: "202px",
    }, 200, function () {
        $(".panel-bottom > .table.table-striped").slideDown();
        $(".panel-bottom").attr("onclick", "closePanelBottom();")
        $(".btn-close-panel-bottom").html('<i class="fa fa-arrow-down"></i>')
    });
}

function setting_panel_click() {
    if ($("#setting-print").hasClass("hide")) {
        $("#setting-print").animate({ right: 0 });
        $("#setting-print").removeClass("hide");
    }
    else {
        $("#setting-print").animate({ right: -200 });
        $("#setting-print").addClass("hide");
    }
}

function check_ddlDieuLuat() {
    var dl = $("#ddlDieuLuat").val();
    if (dl == "22" || dl == "13" || dl == "2229") {
        $("#txtNguoiDeXuat").removeAttr("disabled");
        $("#divNguoiDeXuat").slideDown(100);
    }
    else if (dl == "hk04_luu") {
        $("#dl_bosung").removeAttr("disabled");
    }
    else {
        $("#dl_bosung").attr("disabled", "disabled");
        $("#txtNguoiDeXuat").attr("disabled", "disabled");
        $("#divNguoiDeXuat").slideUp(100);
    }

}

// ADDON -------------------------------------------------------

PageMethod = {
    getAjax: function (type, url, data, dataType, successFunction) {
        $.ajax({
            type: type,
            url: url,
            data: data,
            cache: false,
            dataType: dataType,
            success: function (data) {
                successFunction(data)
            }
        });
    },
    getForm: function (_data, successFunction) {
        $.ajax({
            url: "/services/getForm",
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(_data),
            success: function (d) { successFunction(d) }
        });
    },
    getForms: function (successFunction) {
        $.ajax({
            url: "/services/getForms",
            type: 'POST',
            dataType: 'text',
            contentType: 'application/json',
            data: {},
            success: function (d) { successFunction(d) }
        });
    },
    saveData: function (_data, successFunction) {
        $.ajax({
            url: "/services/saveform",
            type: 'POST',
            dataType: 'text',
            contentType: 'application/json',
            data: JSON.stringify(_data),
            success: function (d) { successFunction(d) }
        });
    },
    updateData: function (_data, successFunction) {
        $.ajax({
            url: "/services/updateform",
            type: 'POST',
            dataType: 'text',
            contentType: 'application/json',
            data: JSON.stringify(_data),
            success: function (d) { successFunction(d) }
        });
    },
    removeData: function (_id, successFunction) {
        $.ajax({
            url: "/services/removeForm",
            type: 'POST',
            dataType: 'text',
            contentType: 'application/json',
            data: JSON.stringify({ id: _id }),
            success: function (d) { successFunction(d) }
        });
    },

    removeAllData: function (successFunction) {
        $.ajax({
            url: "/services/removeAllForm",
            type: 'POST',
            dataType: 'text',
            contentType: 'application/json',
            data: {},
            success: function (d) { successFunction(d) }
        });
    }
}



String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
function SetObjURL(name, url) {
    return objUr = {
        name: name,
        url: url
    }
}

function RenderPrint(strResult, arrUrl, indexAction) {
    PageMethod.getAjax("GET", arrUrl[indexAction].url, null, "text", function (result) {
        indexAction = indexAction + 1;
        if (arrUrl[indexAction] == null || arrUrl[indexAction] == undefined) {
            w = window.open("", "", "width=750,height=842,left=0,top=0");

            // modify document before render
            strResult = strResult.replaceAll("[[cblp]]", (localStorage['person_create'] == undefined ? "" : localStorage['person_create']))

            w.document.write(strResult);
            setTimeout(function () {
                w.print();
                saveDataPrint(strResult);
                w.close();
            }, 300);
            return strResult;
        }
        else {
            strResult += pushDataToFrom(result, arrUrl[indexAction - 1].name);
            RenderPrint(strResult, arrUrl, indexAction)
        }
    })
}

function saveDataPrint(strResult) {
    var dl = $("#ddlDieuLuat > option:selected").val()
    if (dl == "hk04_chuyen")
        return;
    if (dl == "hk04_luu")
        dl = $("#dl_bosung").val();

    // load save data
    var serial = [];
    $("input[type=text], textarea").each(function () {
        serial.push($(this).val());
    })

    // load save table
    var serialTable = [];
    $("#table-hk07 > tbody > tr > td").each(function () {
        serialTable.push($(this).text())
    })

    var data = {};
    data.SoHoKhau = $("#txt12").val();
    data.DieuLuat = dl;
    data.NguoiDeXuat = $("#txt1").val();
    data.HKTTcu = $("#txt16").val();
    data.HKTTmoi = $("#txt19").val();
    data.txtNoiDung = $("#txt17").val();
    data.NgayLap = $("#txtngaylap").val()
    data.NoiDung = strResult;
    data.SerialForm = JSON.stringify(serial);
    data.SerialTable = JSON.stringify(serialTable);

    var id = getParameterByName("id");

    if (id == null || id == undefined || id == "")
        PageMethod.saveData(data, function (d) { console.log(d) })
    else {
        data.Id = id;
        PageMethod.updateData(data, function (d) { console.log(d) })
    }
}





function replaceResult(r, type) {
    for (var i = 1; i < 20; i++) {
        var rpl = "[[txt" + i + "]]";
        r = r.replaceAll(rpl, $("#txt" + i).val());
    }
    return r;
}


function countNKKT() {
    var count = 0;
    $("#table-hk07 > tbody > tr").each(function () {
        if (!($(this).find("> td").text().replaceAll(" ", "").length <= 2))
            count = count + 1;
    })
    return count > 10 || count == 0 ? count : "0" + count;
}

function S_count(i) {
    return (i < 10 ? "0" + i : "" + i);
}


function getListNKKT() {
    var r = "";
    var c = 1;
    $("#table-hk07 > tbody > tr").each(function () {
        if (!($(this).find("> td").text().replaceAll(" ", "").length <= 2))
            r += " &nbsp " + c + ". " + $(this).find("> td:nth-child(2)").text();
        r += " &nbsp " + $(this).find("> td:nth-child(3)").text();
        r += " &nbsp " + $(this).find("> td:nth-child(9 )").text() + "<br />";
        c = c + 1;
    })
    return r;
}



function dlChange() {
    var dl = $("#ddlDieuLuat > option:selected").val();
    $("#tree-view > li").each(function () {
        if ($(this).attr("data-value") == dl) {
            $(this).addClass("active")
        }
        else {
            $(this).removeClass("active")
        }
    })
    check_ddlDieuLuat();
}




function showHidePanel() {
    if ($(".hide-panel-1").css("display") == "none")
        $(".hide-panel-1").slideDown(250);
    else
        $(".hide-panel-1").slideUp(250);
}
function addRow() {
    $("table.custom-table > tbody").append('<tr><td class="td-remove" style="text-align: center; vertical-align: middle">' + ($("table.custom-table > tbody > tr").length + 1) + '</th>'
        + '<td contenteditable="true" style="text-align: center; vertical-align: middle"></td>'
        + '<td contenteditable="true" style="text-align: center; vertical-align: middle"></td>'
        + '<td contenteditable="true" style="text-align: center; vertical-align: middle"></td>'
        + '<td contenteditable="true" style="text-align: center; vertical-align: middle"></td>'
        + '<td contenteditable="true" style="text-align: center; vertical-align: middle"></td>'
        + '<td contenteditable="true" style="text-align: center; vertical-align: middle"></td>'
        + '<td contenteditable="true" style="text-align: center; vertical-align: middle"></td>'
        + '<td contenteditable="true" style="text-align: center; vertical-align: middle" onKeyPress="return handleChange(event)"></td></tr>');
    $("table.custom-table > tbody > tr:last-child > td:nth-child(2)").focus()
}
function addExample() {
    var text = ["Trần Quốc Tuấn Anh", "Bi", "18/11/1992", "Nam", "Hồ Chí Minh", "Ninh Bình", "Kinh", "Không",
        "Việt Nam", "025993699", "123456789", "123456789", "123456789", "Dương Văn Long", "Cháu", " + phiếu 1 + Phiếu 2", "17/01/2017"];
    var textarea = ["40/3a đường số 8 khu phố 3 trường thọ quận thủ đức", "Đây là nội dung thay đổi", "Nơi Xin Đến", "Đây là đề xuất kiến nghị"];
    for (var i = 0; i < text.length; i++) {
        $($("input[type=text]:not(:disabled)")[i]).val(text[i])
    }
    for (var i = 0; i < textarea.length; i++) {
        $($("textarea:not(:disabled)")[i]).val(textarea[i])
    }
}
function handleChange(e) {
    if (e.keyCode == 13 && !e.shiftKey) {
        if ($(e.target).parent().next().length == 0) {
            addRow()
            return false;
        }
        else {
            $(e.target).parent().next().find("> td:nth-child(2)").focus()
            return false;
        }
    }
}

function deleterow() {
    if ($("table.custom-table > tbody > tr").length == 1) {
        $("table.custom-table > tbody > tr:last-child > td").text("")
    }
    else {
        $("table.custom-table > tbody > tr:last-child").remove()
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}










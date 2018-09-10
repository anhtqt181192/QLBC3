var w = null;
var str_chuyen = "(Phần chuyển cho cơ quan đăng ký quản lý cư trú)";
var str_luu = "(Phần lưu tại cơ quan lập phiếu)";
var str_luu_hk07 = "(Phần lưu tại cơ quan cấp giấy)";
var str_end_chuyen_1 = "Công an Q. Thủ Đức đã giải quyết đăng ký thường trú. <br/> Kính chuyển công an nơi đăng ký hộ khẩu thường trú cũ xóa hộ khẩu và chuyển hồ sơ theo quy định"
var str_end_chuyen_2 = "Đề nghị công an nơi chuyển đến khi giải quyết đăng ký HKTT gửi thông tin thay đổi hộ khẩu, nhân khẩu đến công an Q. Thủ Đức để tiến hành thủ tục xóa HKTT và chuyển hồ sơ theo đúng qui định"

LibRepleaceForm = {
    all: function(r, type) {
        for(var i = 1; i < 20; i++) {
            var rpl = "[[txt" + i + "]]";
            r = r.replaceAll(rpl, $("#txt" + i).val());
        }
        if($("#txtngaydexuat").val().replaceAll(" ","") != ""){
            var date = $("#txtngaydexuat").val().split("/");
            r = r.replaceAll("[[txtNgayCanBoLap]]", "Thủ Đức, Ngày " + date[0] + " Tháng " + date[1] + " Năm "  + date[2]);
        }
        else {
            r = r.replaceAll("[[txtNgayCanBoLap]]", "Thủ Đức, Ngày &nbsp; &nbsp; Tháng &nbsp; &nbsp; Năm");
        }
		if($("#txtngayHK04").val().replaceAll(" ","") != ""){
            var date = $("#txtngayHK04").val().split("/");
            r = r.replaceAll("[[txtNgayCanBoLapHK04]]", "Thủ Đức, Ngày " + date[0] + " Tháng " + date[1] + " Năm "  + date[2]);
        }
        else {
            r = r.replaceAll("[[txtNgayCanBoLapHK04]]", "Thủ Đức, Ngày &nbsp; &nbsp; Tháng &nbsp; &nbsp; Năm");
        }
        return r
    },
    hk04 : function(r, type) {  
        var dexuat = $("#txt17").val() + " <br />";
        dexuat += $("#txt19").val() + " <br />";
        if(countNKKT() != "0") {
            dexuat += "Nhân khẩu kèm theo " + countNKKT() + " NK : <br />";
            dexuat += getListNKKT();
        }
        r = r.replaceAll("[[txt17]]", dexuat);
        if(type == "hk04_chuyen"){
            r = r.replaceAll("[[txtDinhDang]]", str_chuyen);
            r = r.replaceAll("[[txt18]]", str_end_chuyen_1);
        }
        if(type == "hk04_luu"){
            r = r.replaceAll("[[txtDinhDang]]", str_luu);
        }
        if(type == "hk04_luu_d28"){
            r = r.replaceAll("[[txtDinhDang]]", str_luu);
            r = r.replaceAll("[[txt18]]", "");
        }
        if(type == "hk04_chuyen_d28"){
            r = r.replaceAll("[[txtDinhDang]]", str_chuyen);
            r = r.replaceAll("[[txt18]]", str_end_chuyen_2);
        }
        
        return LibRepleaceForm.all(r, type);
    },
    hk04_d22: function(r,type) {
        r = r.replace("[[txt14]]", "[[_txt14]]")
            r = r.replace("[[txt14]]", "")
            r = r.replace("[[_txt14]]", "[[txt14]]")
            r = r.replace("[[txt15]]", "[[_txt15]]")
            r = r.replace("[[txt15]]", "")
            r = r.replace("[[_txt15]]", "[[txt15]]")
        if(countNKKT() != "0") {
            r = r.replaceAll("[[txtDinhDang]]", str_luu);
            var dexuat = "";
            dexuat += "Xóa chết NK Tên " + $("#txt1").val() + " Kèm " + S_count(parseInt(countNKKT())) + " NK : <br />";
            dexuat += getListNKKT();
            r = r.replaceAll("[[txt17]]", dexuat);
        }
        else { 
            r = r.replaceAll("[[txt17]]", "Xóa chết " + S_count(parseInt(countNKKT()) + 1) + " NK Tên " + $("#txt1").val() + " sn " +  $("#txt3").val());
        }
        return LibRepleaceForm.all(r, type);
    },
    hk04_2 : function(r, type) {
        var dexuat = $("#txt17").val() + " <br />";
        dexuat += $("#txt19").val() + " <br />";
        if(countNKKT() != "0") {
            dexuat += "Nhân khẩu kèm theo " + countNKKT() + " NK : <br />";
            dexuat += getListNKKT();
        }
        r = r.replaceAll("[[txt17]]", dexuat);
        if(type == "hk04_chuyen"){
            r = r.replaceAll("[[txtDinhDang]]", str_chuyen);
            r = r.replaceAll("[[txt18]]", str_end_chuyen_2);
        }
        if(type == "hk04_luu"){
            r = r.replaceAll("[[txtDinhDang]]", str_luu);
        }
        return LibRepleaceForm.all(r, type);
    },
    hk07 : function(r, type) {
        if(type == "hk07_luu"){
            r = r.replaceAll("[[txtDinhDang]]", str_luu_hk07);
			r = r.replaceAll("[[txtSoNK]]", $("#txtSoNK").val());
            if( $("#table-hk07 > tbody > tr").length < 5) {
                for(var i = 0; i < 7 - $("#table-hk07 > tbody > tr").length; i++){
                addRow();
                }
            }
            $("#table-hk07 > tbody > tr").each(function() {
                if($(this).find("> td").text().replaceAll(" ","").length <= 2)
                $(this).find("> td:first-child").text("")
                else
                $(this).find("> td:first-child").text(parseInt($("#table-hk07 > tbody > tr").index($(this)) + 1))
            })
            r = r.replaceAll("[[table1]]", document.getElementById("table-hk07").outerHTML);
        }
        if(type == "hk07_chuyen"){
            r = r.replaceAll("[[txtDinhDang]]", "( Phần cấp cho người chuyển hộ khẩu )");
			r = r.replaceAll("[[txtSoNK]]", $("#txtSoNK").val());
            if( $("#table-hk07 > tbody > tr").length < 5) {
                for(var i = 0; i < 7 - $("#table-hk07 > tbody > tr").length; i++){
                addRow();
                }
            }
            $("#table-hk07 > tbody > tr").each(function() {
                if($(this).find("> td").text().replaceAll(" ","").length <= 2)
                $(this).find("> td:first-child").text("")
                else
                $(this).find("> td:first-child").text(parseInt($("#table-hk07 > tbody > tr").index($(this)) + 1))
            })
            r = r.replaceAll("[[table1]]", document.getElementById("table-hk07").outerHTML);
        }
        return LibRepleaceForm.all(r, type);
    },
    d13 : function(r, type) {
        r = r.replaceAll("[[txt19]]", "Nhập sinh cho con ( cháu ) " + $("#txt1").val() + " sinh ngày " + $("#txt3").val());
        r = r.replaceAll("[[txt16]]", $("#txt19").val());
        r = r.replaceAll("[[nkkt]]", countNKKT())
        r = r.replaceAll("[[txt1]]", $("#txtNguoiDeXuat").val())
         var dexuat = "Ngày " + ($("#txtngaylap").val().replaceAll(" ","") == "" ? "                        " : $("#txtngaylap").val().replaceAll(" ",""))+ " nội cần nhận hồ sơ của ";
        dexuat += $("#divNguoiDeXuat .fa-check-circle").parent().attr("data-value") + " " + $("#txtNguoiDeXuat").val();
        dexuat += " có HKKT tại " + $("#txt19").val() + "<br />";
        dexuat += "Nay anh, chị nhập hộ khẩu cho con ( cháu ) " + $("#txt1").val() + " sinh ngày " + $("#txt3").val() + "  theo cha, mẹ về địa chỉ nhà trên";
        if(countNKKT() != "0") {
            dexuat += " kèm " + countNKKT() + " NK : <br />"
            dexuat += "Nhân khẩu kèm theo " + countNKKT() + " NK : <br />";
            dexuat += getListNKKT();
        }
        else {
            dexuat += "<br/>";
        }
        dexuat += " Hồ sơ bao gồm : HK02 + khai sinh " + $("#txths").val() + " <br />";
        dexuat += "K/c BCH Đội duyệt cho nhập " + ( ( parseInt(countNKKT()) + 1 ) < 10 ? "0" + ( parseInt(countNKKT()) + 1 ) : ( parseInt(countNKKT()) + 1 ) ) + " nhân khẩu theo điều 13 - Luật Cư Trú";
        r = r.replaceAll("[[dexuat]]", dexuat)
        return LibRepleaceForm.all(r, type);
    },
    d20 : function(r, type) {
        r = r.replaceAll("[[nkkt]]", countNKKT())
        var dexuat = "anh/chị " + $("#txt1").val();
        dexuat += " xin nhập hộ khẩu về địa chỉ nhà trên <br />";
        dexuat += " Hồ sơ bao gồm : HK07 + HK02 + HK01 + CMND + Giấy kết hôn / khai sinh " + $("#txths").val() + " <br />";
        if(countNKKT() != "0") {
            dexuat += "Nhân khẩu kèm theo " + countNKKT() + " NK : <br />";
            dexuat += getListNKKT();
        }
        dexuat += "K/c BCH Đội duyệt cho nhập " + ( ( parseInt(countNKKT()) + 1 ) < 10 ? "0" + ( parseInt(countNKKT()) + 1 ) : ( parseInt(countNKKT()) + 1 ) ) + " nhân khẩu theo điểm a khoản 2 điều 20 - Luật Cư Trú";
        r = r.replaceAll("[[dexuat]]", dexuat)
        return LibRepleaceForm.all(r, type);
    },
    kad20 : function(r, type) {
        r = r.replaceAll("[[nkkt]]", countNKKT())
        //r = r.replaceAll("[[txt1]]", $("#txtNguoiDeXuat").val())
        var dexuat = "Ngày " + ($("#txtngaylap").val().replaceAll(" ","") == "" ? "                        " : $("#txtngaylap").val().replaceAll(" ",""))+ " nội cần nhận hồ sơ của ";
        dexuat += ( $("#txt4").val() == "Nam" ? "anh " : "chị " ) + $("#txt1").val();
        dexuat += " có HKKT tại " + $("#txt16").val() + "<br />";
        dexuat += " Nay xin nhập theo " + $("#txtNhapTheo").val() + " về địa chỉ nhà trên ";
        if(countNKKT() != "0") {
            dexuat += "kèm " + countNKKT() + " NK : <br />";
            dexuat += getListNKKT();
        }
        else {
            dexuat += "<br />";
        }
        dexuat += " Hồ sơ bao gồm : HK02 + HK01 + HK07 + CMND + Giấy kết hôn / khai sinh " + $("#txths").val() + " <br />";
        dexuat += "K/c BCH Đội duyệt cho nhập " + ( ( parseInt(countNKKT()) + 1 ) < 10 ? "0" + ( parseInt(countNKKT()) + 1 ) : ( parseInt(countNKKT()) + 1 ) ) + " nhân khẩu theo điểm a khoản 2 điều 20 - Luật Cư Trú";
        r = r.replaceAll("[[dexuat]]", dexuat)
        return LibRepleaceForm.all(r, type);
    },
    kad20_1 : function(r, type) {
        r = r.replaceAll("[[nkkt]]", countNKKT())
        var dexuat = "Ngày " + $("#txtngaylap").val();
        dexuat += " nội cần nhận hồ sơ của anh " + $("#txtNguoiDeXuat").val() + " Có HKTT tại " + $("#txt16").val() + " <br />";
        dexuat += " Nay anh xin xóa chết " + S_count(countNKKT()) + " NK tên " + $("#txt1").val() + " sinh ngày " + $("#txt3").val() ;
        if(countNKKT() != "0") {
            dexuat += " Kèm " + S_count(countNKKT()) + " NK : <br />";
            dexuat += getListNKKT();
        }
        else {
            dexuat +=  "<br />";
        }
        dexuat += " Hồ sơ bao gồm : HK02 + Giấy chứng tử ";
        dexuat += " K/c BCH Đội duyệt xóa chết 01 NK " +  + " nhân khẩu theo điểm A khoản 2 điều 20 Luật Cư Trú";
        r = r.replaceAll("[[dexuat]]", dexuat)
        return LibRepleaceForm.all(r, type);
    },
    d22 : function(r, type) {
        r = r.replaceAll("[[nkkt]]", countNKKT());
        r = r.replaceAll("[[txt19]]", "Xóa chết")
        r = r.replaceAll("[[txt1]]", $("#txtNguoiDeXuat").val())
        var dexuat = "Ngày " + ($("#txtngaylap").val().replaceAll(" ","") == "" ? "                        " : $("#txtngaylap").val().replaceAll(" ",""))+ " nội cần nhận hồ sơ của ";
        dexuat += ($("#radio_nam_1 > i").hasClass("fa-check-circle") ? "anh" : "chị") + " " + $("#txtNguoiDeXuat").val();
        dexuat += " có HKKT tại " + $("#txt16").val() + "<br />";
        dexuat += " Nay " + ($("#radio_nam_1 > i").hasClass("fa-check-circle") ? "anh" : "chị" ) + " xóa chết " + S_count(parseInt(countNKKT()) + 1) + " NK tên " + $("#txt1").val() + " sinh ngày " + $("#txt3").val() + "  <br />";
        dexuat += " Hồ sơ bao gồm : HK02 + giấy chứng tử " + $("#txths").val() + " <br />";
        if(countNKKT() != "0") {
            dexuat += "Nhân khẩu kèm theo " + countNKKT() + " NK : <br />";
            dexuat += getListNKKT();
        }
        dexuat += "K/c BCH Đội duyệt xóa chết " + ((parseInt(countNKKT()) + 1 ) < 10 ? "0" + (parseInt(countNKKT()) + 1 ) : (parseInt(countNKKT()) + 1 )) + " NK (điểm a khoản 1 điều 22 - Luật Cư Trú)";
        r = r.replaceAll("[[dexuat]]", dexuat)
        return LibRepleaceForm.all(r, type);
    },
    d23 : function(r, type) {
        r = r.replaceAll("[[nkkt]]", countNKKT())
        var dexuat = "Ngày " + ($("#txtngaylap").val().replaceAll(" ","") == "" ? "                        " : $("#txtngaylap").val().replaceAll(" ",""))+ " nội cần nhận hồ sơ của ";
        dexuat += ( $("#txt4").val() == "Nam" ? "anh " : "chị " ) + $("#txt1").val();
        dexuat += " có HKKT tại " + $("#txt16").val() + "<br />";
        dexuat += " Nay " + ( $("#txt4").val() == "Nam" ? "anh " : "chị " ) + " xin "+ $("#txtNhapTheo").val() + " về địa chỉ "+ $("#txt19").val();
        
        if(countNKKT() != "0") {
            dexuat += " Kèm  " + countNKKT() + " NK : <br />";
            dexuat += getListNKKT();
        }
        else {
            dexuat += "<br />";
        }
        dexuat += " Hồ sơ bao gồm : HK02 + HK07 " + $("#txths").val() + " <br />";
        dexuat += "K/c BCH Đội duyệt cho lập hộ ( nhập ) " + ( ( parseInt(countNKKT()) + 1 ) < 10 ? "0" + ( parseInt(countNKKT()) + 1 ) : ( parseInt(countNKKT()) + 1 ) ) + " nhân khẩu theo khoản 1 điều 23 - Luật Cư Trú";
        r = r.replaceAll("[[dexuat]]", dexuat)
        return LibRepleaceForm.all(r, type);
    },
    d27 : function(r, type) {
        r = r.replaceAll("[[nkkt]]", countNKKT())
        r = r.replaceAll("[[txt19]]", "Tách hộ ghép cùng địa chỉ")
        var dexuat = "Ngày " + ($("#txtngaylap").val().replaceAll(" ","") == "" ? "                        " : $("#txtngaylap").val().replaceAll(" ",""))+ " nội cần nhận hồ sơ của ";
        dexuat += ($("#txt4").val() == "Nam" ? "anh " : "chị ") + $("#txt1").val() + " sinh ngày : " + $("#txt3").val();
        dexuat += " có HKKT tại " + $("#txt16").val() + "<br/>";
        var dc = $("#txt19").val().replaceAll(" ", "") == "" ? "cùng địa chỉ" : "tại địa chỉ : " + $("#txt19").val() +" <br />";
        dexuat += " Nay " + ($("#txt4").val() == "Nam" ? "anh " : "chị ") + " tách hộ ghép " + dc +" <br />";
        if(countNKKT() != "0") {
            dexuat += "Kèm " + countNKKT() + " NK : <br />";
            dexuat += getListNKKT();
        }

        dexuat += " Hồ sơ bao gồm : HK02 + hồ sơ tàng thư " + $("#txths").val() + " <br />";
        dexuat += "K/c BCH Đội duyệt cho tách hộ ghép " + ( ( parseInt(countNKKT()) + 1 ) < 10 ? "0" + ( parseInt(countNKKT()) + 1 ) : ( parseInt(countNKKT()) + 1 ) ) + " nhân khẩu theo điều 27 - Luật Cư Trú";
        r = r.replaceAll("[[dexuat]]", dexuat)
        return LibRepleaceForm.all(r, type);
    },
    d28 : function(r, type) {
        r = r.replaceAll("[[nkkt]]", countNKKT())
        var dexuat = "Ngày " + ($("#txtngaylap").val().replaceAll(" ","") == "" ? "                        " : $("#txtngaylap").val().replaceAll(" ",""))+ " nội cần nhận hồ sơ của ";
        dexuat += ( $("#txt4").val() == "Nam" ? "anh " : "chị " ) + $("#txt1").val();
        dexuat += " xin chuyển hộ khẩu về địa chỉ nhà trên <br />";
        dexuat += " Hồ sơ bao gồm : HK02 " + $("#txths").val() + " <br />";
        if(countNKKT() != "0") {
            dexuat += "Nhân khẩu kèm theo " + countNKKT() + " NK : <br />";
            dexuat += getListNKKT();
        }
        dexuat += "K/c BCH Đội duyệt cho chuyển " + ( ( parseInt(countNKKT()) + 1 ) < 10 ? "0" + ( parseInt(countNKKT()) + 1 ) : ( parseInt(countNKKT()) + 1 ) ) + " nhân khẩu theo điểm b khoản 2 điều 28 - Luật Cư Trú";
        r = r.replaceAll("[[dexuat]]", dexuat)
        return LibRepleaceForm.all(r, type);
    },
    d29 : function(r, type) {
        r = r.replaceAll("[[nkkt]]", countNKKT())
        r = r.replaceAll("[[txt19]]", "Điều chỉnh chủ hộ")
        var dexuat = "Ngày " + ($("#txtngaylap").val().replaceAll(" ","") == "" ? "                        " : $("#txtngaylap").val().replaceAll(" ",""))+ " nội cần nhận hồ sơ của ";
        dexuat += ($("#txt4").val() == "Nam" ? "anh " : "chị ") + $("#txt1").val() + " sinh ngày " + $("#txt3").val();
        dexuat += " HKKT tại " + $("#txt16").val() + "<br />";
        dexuat += " Nay đứng chủ hộ tại địa chỉ trên <br />";
        dexuat += " Hồ sơ bao gồm : HK02 + đơn đổi chủ hộ " + $("#txths").val() + " <br />";
        dexuat += "K/c BCH Đội duyệt điều chỉnh chủ hộ 01 NK ( Khoản 1 điều 29 - Luật Cư Trú)";
        r = r.replaceAll("[[dexuat]]", dexuat)
        return LibRepleaceForm.all(r, type);
    },
    k04d29 : function (r, type) {
        r = r.replaceAll("[[nkkt]]", "")
        var dexuat = "Ngày " + ($("#txtngaylap").val().replaceAll(" ", "") == "" ? "                        " : $("#txtngaylap").val().replaceAll(" ", "")) + " nội cần nhận hồ sơ của ";
        dexuat += ($("#txt4").val() == "Nam" ? "anh " : "chị ") + $("#txt1").val() + " sinh ngày " + $("#txt3").val();
        dexuat += " HKKT tại " + $("#txt16").val() + "<br />";
        dexuat += " Nay xin chuyển hộ khẩu trong quận theo " + $("#txtNhapTheo").val() + " về địa chỉ : " + $("#txt19").val() + "  <br />";
        if (countNKKT() != "0") {
            dexuat += "Nhân khẩu kèm theo " + countNKKT() + " NK : <br />";
            dexuat += getListNKKT();
        }
        dexuat += " Hồ sơ bao gồm : HK02 + giấy kết hôn / giấy khai sinh <br />";
        dexuat += "<b> Kính chuyển BCH Đội duyệt chuyển trong quận " + ((parseInt(countNKKT()) + 1) < 10 ? "0" + (parseInt(countNKKT()) + 1) : (parseInt(countNKKT()) + 1)) + " nhân khẩu căn cứ theo Khoản 4 Điều 29 - Luật Cư Trú </b>";
        r = r.replaceAll("[[dexuat]]", dexuat)
        return LibRepleaceForm.all(r, type);
    },
    k04d29th: function (r, type) {
        r = r.replaceAll("[[nkkt]]", countNKKT())
        var dexuat = "Ngày " + ($("#txtngaylap").val().replaceAll(" ", "") == "" ? "                        " : $("#txtngaylap").val().replaceAll(" ", "")) + " nội cần nhận hồ sơ của ";
        dexuat += ($("#txt4").val() == "Nam" ? "anh " : "chị ") + $("#txt1").val() + " sinh ngày : " + $("#txt3").val();
        dexuat += " có HKKT tại " + $("#txt16").val() + "<br/>";
        var dc = $("#txt19").val().replaceAll(" ", "") == "" ? "trên" : $("#txt19").val();
        dexuat += " Nay " + ($("#txt4").val() == "Nam" ? "anh " : "chị ") + " tách hộ tại địa chỉ  " + dc + " <br />";
        if (countNKKT() != "0") {
            dexuat += "Kèm " + countNKKT() + " NK : <br />";
            dexuat += getListNKKT();
        }

        dexuat += " Hồ sơ bao gồm : HK02 + " + $("#txths").val() + " <br />";
        dexuat += "K/c BCH Đội duyệt cho tách hộ " + ((parseInt(countNKKT()) + 1) < 10 ? "0" + (parseInt(countNKKT()) + 1) : (parseInt(countNKKT()) + 1)) + " nhân khẩu theo khoản 4 điều 29 - Luật Cư Trú";
        r = r.replaceAll("[[dexuat]]", dexuat)
        return LibRepleaceForm.all(r, type);
    },
    d2229 : function(r, type) {
        r = r.replaceAll("[[nkkt]]", "")
        r = r.replaceAll("[[txt19]]","Xóa chết, thay chủ hộ")
		var dexuat = "Ngày " + ($("#txtngaylap").val().replaceAll(" ","") == "" ? "                        " : $("#txtngaylap").val().replaceAll(" ",""))+ " nội cần nhận hồ sơ của ";
        dexuat += ($("#txt4").val() == "Nam" ? "anh " : "chị ") + $("#txt1").val() + " sinh ngày " + $("#txt3").val();
        dexuat += " HKKT tại " + $("#txt16").val() + "<br />";
        dexuat += " Nay xin thay chủ hộ và xóa chết 01 nhân khẩu tên: " + $("#txtNguoiDeXuat").val() + "<br />";
        dexuat += " Hồ sơ bao gồm : HK02 + trích lục khai tử + Đơn thay chủ hộ  " + $("#txths").val() + " <br />";
        if (countNKKT() != "0") {
            dexuat += "Kèm " + countNKKT() + " NK : <br />";
            dexuat += getListNKKT();
        }
        dexuat += " K/c BCH Đội duyệt xóa chết " + ((parseInt(countNKKT()) + 1) < 10 ? "0" + (parseInt(countNKKT()) + 1) : (parseInt(countNKKT()) + 1)) + " nhân khẩu căn cứ theo Điều 22 - Luật Cư Trú và thay đổi chủ hộ theo Điều 29 - Luật Cư Trú";
        r = r.replaceAll("[[dexuat]]", dexuat)
        return LibRepleaceForm.all(r, type);
    },
}

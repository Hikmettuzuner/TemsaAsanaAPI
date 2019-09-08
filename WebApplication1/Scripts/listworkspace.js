$(document).ready(function ($) {

    var someSessionVariable = $("#hdnsession").data('value');
    var settings = {
        "url": "https://app.asana.com/api/1.0/workspaces",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer  " + someSessionVariable
        },
    };
    $.ajax(settings).done(function (response) {
        document.getElementById("demo").value = (response.data[0].id);
        document.getElementById("as").value = (response.data[0].name);
    });

    /////////////////////////////////////////////////POST PROJECT
    /////////////////////////////////////////////////POST PROJECT
    /////////////////////////////////////////////////POST PROJECT
    /////////////////////////////////////////////////POST PROJECT
    /////////////////////////////////////////////////POST PROJECT
    $("#btn").click(function () {
        $("#projectname").val
            (
            $.trim($("#projectname").val())
            )
        $("#projectmission").val
            (
            $.trim($("#projectmission").val())
            )
        var isim = $("#projectname").val();
        var aciklama = $("#projectmission").val();

        if (isim == '' || aciklama == '') {
            swal("Oops", "Lütfen Boş Kutuları Doldurunuz!", "error")
        } else {
            swal("Tebrikler", "((" + isim + "))" + "Adlı Kaydınız Başarılı!", "success")
            var settings = {
                "url": "https://app.asana.com/api/1.0/workspaces/1108392209054696/projects",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Authorization": "Bearer " + someSessionVariable
                },
                "data": {
                    "name": isim,
                    "notes": aciklama
                }
            };
            $.ajax(settings).done(function (response) {

                console.log(response);
                location.reload();
            });
        }
    });

    /////////////////////////////////////////////////LIST PROJECT
    /////////////////////////////////////////////////LIST PROJECT
    /////////////////////////////////////////////////LIST PROJECT
    /////////////////////////////////////////////////LIST PROJECT
    /////////////////////////////////////////////////LIST PROJECT


    $("#listele_btn").click(function () {
        var settings = {
            "url": "https://app.asana.com/api/1.0/projects?opt_fields=created_at,modified_at,owner,due_date,current_status,public,name,notes,archived,workspace,color,members,followers",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + someSessionVariable
            },
        };

        $.ajax(settings).done(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                $("#list_project").
                    append($("<option value='" + response.data[i].id + "'>" + response.data[i].id + "+" + response.data[i].name + "</option>"));
            }
        });
        myTasktFunctionn();
        return 0;
    });

    /////////////////////////////////////////////////LIST TASK
    /////////////////////////////////////////////////LIST TASK
    /////////////////////////////////////////////////LIST TASK
    /////////////////////////////////////////////////LIST TASK
    /////////////////////////////////////////////////LIST TASK
    var settings = {
        "url": "https://app.asana.com/api/1.0/projects?opt_fields=created_at,modified_at,owner,due_date,current_status,public,name,notes,archived,workspace,color,members,followers",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer " + someSessionVariable
        },
    };
    $.ajax(settings).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            $("#selectprojecttask").
                append($("<option value='" + response.data[i].id + "'>" + response.data[i].name + "</option>"));
        }
        var projeler = document.getElementById("selectprojecttask");
        projeler.addEventListener('change', function () {
            //var okunanid = okunan.options[okunan.selectedIndex].value;
            //console.log(okunanid);
            //var okunanname = okunan.options[okunan.selectedIndex].text;
            //console.log(okunanname);
        })
    });
    $("#listele_task_btn").click(function () {
        var projeler = document.getElementById("selectprojecttask");
        var projelerid = projeler.options[projeler.selectedIndex].value;

        var settings = {
            "url": "https://app.asana.com/api/1.0/projects/" + projelerid + "/tasks?opt_fields=id,created_at,modified_at,name,notes,assignee,completed,assignee_status,completed_at,due_on,due_at,projects,memberships,tags,workspace,num_hearts,parent,hearts,followers,hearted&completed_since=2016-10-07T22:54:00.867Z",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + someSessionVariable
            },
        };
        $.ajax(settings).done(function (response) {
            if (response.data.length == "") {
                $("#grv_task").html('<option value="-1">Görev Bulunmamaktadır</option>');
                swal("Oops", "Hiç Görev Bulunmamaktadır.", "error")
                return 0;
            }
            for (var i = 0; i < response.data.length; i++) {
                $("#list_gorev").
                    append($("<li>" + "Task ID = " + response.data[i].id + "<br>" + "Task Adı = " + response.data[i].name + "<br>" + "Açıklama = " + response.data[i].notes + "<br>" + "Tamamlanma Durumu = " + response.data[i].completed + "<br>" + "Oluşturulma Tarihi = " + response.data[i].created_at + "</li>"))
            }
            console.log(response);
            swal("Listeleme Başarılı!");
            myTasktFunction();
            return 0;
        })
    });
    function myTasktFunction() {
        document.getElementById("listele_task_btn").disabled = true;
    }
    function myTasktFunctionn() {
        document.getElementById("listele_btn").disabled = true;
    }
    /////////////////////////////////////////////////POST TASK AND ASSIGN TO INTO PROJECT
    /////////////////////////////////////////////////POST TASK AND ASSIGN TO INTO PROJECT
    /////////////////////////////////////////////////POST TASK AND ASSIGN TO INTO PROJECT
    /////////////////////////////////////////////////POST TASK AND ASSIGN TO INTO PROJECT
    /////////////////////////////////////////////////POST TASK AND ASSIGN TO INTO PROJECT
    var settings = {
        "url": "https://app.asana.com/api/1.0/projects?opt_fields=created_at,modified_at,owner,due_date,current_status,public,name,notes,archived,workspace,color,members,followers",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer " + someSessionVariable
        },
    };
    $.ajax(settings).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            $("#selectproject").append($("<option value='" + response.data[i].id + "'>" + response.data[i].name + "</option>"));
        }
        var e = document.getElementById("selectproject");
        e.addEventListener('change', function () {
            var value = e.options[e.selectedIndex].value;
            console.log(value);
            var text = e.options[e.selectedIndex].text;
            console.log(text);
        })
    });
    var settings_task_personn = {
        "url": "https://app.asana.com/api/1.0/workspaces/1108392209054696/users",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer " + someSessionVariable
        },
    };
    $.ajax(settings_task_personn).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            $("#task_person").
                append($("<option value='" + response.data[i].id + "'>" + response.data[i].name + "</option>"));
        }
        perso_fortask = document.getElementById("task_person");
        perso_fortask.addEventListener('change', function () {
            persoName_fortask = perso_fortask.options[perso_fortask.selectedIndex].text;
            persoId_fortask = perso_fortask.options[perso_fortask.selectedIndex].value;
            //console.log(persoId_fortask);
        })
    });
    $("#formgonder").click(function () {
        $("#tasklistname").val
            (
            $.trim($("#tasklistname").val())
            )
        $("#tasklistdesc").val
            (
            $.trim($("#tasklistdesc").val())
            )
        var e = document.getElementById("selectproject");
        var ae = e.options[e.selectedIndex].value;
        var tasklistisim = $("#tasklistname").val();
        var tasklistaciklama = $("#tasklistdesc").val();

        task_forper = document.getElementById("task_person");
        a = task_forper.options[task_forper.selectedIndex].value;
        perso_fortask = document.getElementById("task_person");
        b = perso_fortask.options[perso_fortask.selectedIndex].text;
        //console.log(a);

        if (tasklistisim == '' || tasklistaciklama == '' || b == '') {
            swal("Oops", "Lütfen Boş Kutuları Doldurunuz!", "error")
        } else {
            swal("Tebrikler", "((" + tasklistisim + "))" + "Adlı Kaydınız Başarılı!", "success")
            var settings = {
                "url": "https://app.asana.com/api/1.0/tasks?projects=" + ae + "&workspace=1108392209054696",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Authorization": "Bearer " + someSessionVariable

                },
                "data": {
                    "name": tasklistisim,
                    "notes": tasklistaciklama,
                    "assignee": b
                }
            };
            $.ajax(settings).done(function (response) {
                console.log(response);
                location.reload();
            });
        }
    });
    /////////////////////////////////////////////////POST FOLLOWERS TO INTO TASK
    /////////////////////////////////////////////////POST FOLLOWERS TO INTO TASK
    /////////////////////////////////////////////////POST FOLLOWERS TO INTO TASK
    /////////////////////////////////////////////////POST FOLLOWERS TO INTO TASK
    /////////////////////////////////////////////////POST FOLLOWERS TO INTO TASK
    $("#grv_proje").html('<option value="">İlk Olarak Projenizi Seçiniz</option>');
    $("#grv_task").html('<option value="">İlk Olarak Projenizi Seçiniz</option>');

    var followersname;
    var followersid;

    var settings = {
        "url": "https://app.asana.com/api/1.0/projects?opt_fields=created_at,modified_at,owner,due_date,current_status,public,name,notes,archived,workspace,color,members,followers",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer " + someSessionVariable
        },
    };
    $.ajax(settings).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            $("#grv_proje").
                append($("<option value='" + response.data[i].id + "'>" + response.data[i].name + "</option>"));
        }
        followersname = document.getElementById("grv_proje");
        followersname.addEventListener('change', function () {

            $("#grv_task").empty();
            followersid = followersname.options[followersname.selectedIndex].value;
            console.log(followersid);
            if (followersid == "") {
                $("#grv_task").html('<option value="-1">Görev Bulunmamaktadır</option>');
                swal("Oops", "Yukarıdaki Formdan Görev Tanımı Giriniz", "error")
                return 0;
            }
            else {
                var settings_test = {
                    "url": "https://app.asana.com/api/1.0/projects/" + followersid + "/tasks?opt_fields=id,created_at,modified_at,name,notes,assignee,completed,assignee_status,completed_at,due_on,due_at,projects,memberships,tags,workspace,num_hearts,parent,hearts,followers,hearted&completed_since=2016-10-07T22:54:00.867Z",
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Authorization": "Bearer " + someSessionVariable
                    },
                };
                $.ajax(settings_test).done(function (response) {
                    console.log("sss");
                    if (response.data.length == 0) {
                        $("#grv_task").html('<option value="-1">Görev Bulunmamaktadır</option>');
                        swal("Oops", "Görev Yok! Lütfen Görev Giriniz", "error")
                        return 0;

                    }
                    console.log(response.data.length);
                    for (var i = 0; i < response.data.length; i++) {

                        $("#grv_task").append($("<option value='" + response.data[i].id + "'>" + response.data[i].name + "</option>"));
                    }

                    task_forper = document.getElementById("grv_task");
                    task_forper.addEventListener('change', function () {
                        taskid_for = task_forper.options[task_forper.selectedIndex].value;
                    })
                    return 0;
                })
            }
        })
    });
    var settings_task_person = {
        "url": "https://app.asana.com/api/1.0/workspaces/1108392209054696/users",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer " + someSessionVariable
        },
    };
    $.ajax(settings_task_person).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            $("#grv_person").
                append($("<option value='" + response.data[i].id + "'>" + response.data[i].name + "</option>"));
        }
        perso_fortask = document.getElementById("grv_person");
        perso_fortask.addEventListener('change', function () {
            persoName_fortask = perso_fortask.options[perso_fortask.selectedIndex].text;
            //console.log(persoName_fortask);
        })
    });
    $("#project_task_per").click(function () {
        task_forper = document.getElementById("grv_task");
        a = task_forper.options[task_forper.selectedIndex].value;
        perso_fortask = document.getElementById("grv_person");
        b = perso_fortask.options[perso_fortask.selectedIndex].text;
        if (a == '') {
            swal({
                title: "Oops", text: "Lütfen Görev Seçiniz!", type:
                    "error"
            }).then(function () {
                location.reload();
            }
            );
        } else {
            var settings = {
                "url": "https://app.asana.com/api/1.0/tasks/" + a + "/addFollowers",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Authorization": "Bearer " + someSessionVariable
                },
                "data": {
                    "followers": b
                }
            };
            $.ajax(settings).done(function (response) {
                console.log(response);
                swal({
                    title: "Tebrikler", text: "Kayıt Başarılı", type:
                        "success"
                }).then(function () {
                    location.reload();
                }
                );
            });
        }
    });
    /////////////////////////////////////////////////COMPLETED TASK AND PROJECT
    /////////////////////////////////////////////////COMPLETED TASK AND PROJECT
    /////////////////////////////////////////////////COMPLETED TASK AND PROJECT
    /////////////////////////////////////////////////COMPLETED TASK AND PROJECT
    /////////////////////////////////////////////////COMPLETED TASK AND PROJECT

    $("#projectsfor_finish").html('<option value="">İlk Olarak Projenizi Seçiniz</option>');
    $("#tasksfor_finish").html('<option value="">İlk Olarak Projenizi Seçiniz</option>');
    var task_forper;
    var taskid_for;

    var settings = {
        "url": "https://app.asana.com/api/1.0/projects?opt_fields=created_at,modified_at,owner,due_date,current_status,public,name,notes,archived,workspace,color,members,followers",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer " + someSessionVariable
        },
    };
    $.ajax(settings).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            $("#projectsfor_finish").
                append($("<option value='" + response.data[i].id + "'>" + response.data[i].name + "</option>"));
        }
        okunann = document.getElementById("projectsfor_finish");
        okunann.addEventListener('change', function () {
            $("#tasksfor_finish").empty();
            okunanidd = okunann.options[okunann.selectedIndex].value;

            if (okunanidd == "") {
                $("#tasksfor_finish").html('<option value="-1">Görev Bulunmamaktadır</option>');
            }
            else {
                var settings_test = {
                    "url": "https://app.asana.com/api/1.0/projects/" + okunanidd + "/tasks?opt_fields=id,created_at,modified_at,name,notes,assignee,completed,assignee_status,completed_at,due_on,due_at,projects,memberships,tags,workspace,num_hearts,parent,hearts,followers,hearted&completed_since=2016-10-07T22:54:00.867Z",
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Authorization": "Bearer " + someSessionVariable
                    },
                };
                $.ajax(settings_test).done(function (response) {
                    if (response.data.length == 0) {
                        $("#tasksfor_finish").html('<option value="-1">Görev Bulunmamaktadır</option>');
                        swal({
                            title: "Oops", text: "Tanımlı Görev Yok!", type:
                                "error"
                        }).then(function () {
                            location.reload();
                        }
                        );
                    }
                    for (var i = 0; i < response.data.length; i++) {

                        $("#tasksfor_finish").append($("<option value='" + response.data[i].id + "'>" + response.data[i].name + "</option>"));
                    }
                    task_forper = document.getElementById("tasksfor_finish");
                    task_forper.addEventListener('change', function () {

                        taskid_for = task_forper.options[task_forper.selectedIndex].value;
                        //console.log(taskid_for);
                    })
                    return 0;
                })
            }
        });
    });
    $("#btn_task_finish").click(function () {

        a = document.getElementById("tasksfor_finish");
        b = a.options[a.selectedIndex].value;
        if (b == '') {

            swal({
                title: "Oops", text: "Lütfen Görev Seçiniz!", type:
                    "error"
            }).then(function () {
                location.reload();
            }
            );
        }
        //console.log(b);
        var settings_finished = {
            "url": "https://app.asana.com/api/1.0/tasks/" + b + "/?opt_pretty",
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + someSessionVariable
            },
            "data": {
                "completed": "true"
            }
        };
        $.ajax(settings_finished).done(function (response) {
            console.log(response);
            swal({
                title: "Tebrikler", text: "Görev Tamamlandı !", type:
                    "success"
            }).then(function () {
                location.reload();
            }
            );
        });
    }); //btn_task_finish Bitiyor
    //DocumentReady Function Bitiyor
});
//Hikmet Temsa
//
// sistemde çalışan
//0 / c01a52f185cc2e2ce4414381065ab372 MELİS
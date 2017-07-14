/**
 * Created by alice on 07.07.17.
 */
$(document).ready(function () {

    // $(".table").tablesorter();

    var filters = [];

    function apply_filter(table, col, text) {
        filters[col] = text;

        $(table).find('tr').each(function (i) {
            $(this).data('passed', true);
        });

        for (index in filters) {
            if (filters[index] !== 'any') {
                $(table).find('tr td:nth-child(' + index + ')').each(function (i) {
                    if ($(this).text().indexOf(filters[index]) > -1 && $(this).parent().data('passed')) {
                        $(this).parent().data('passed', true);
                    }
                    else {
                        $(this).parent().data('passed', false);
                    }
                });
            }
        }

        $(table).find('tr').each(function (i) {
            if (!$(this).data('passed')) {
                $(this).hide();
            }
            else {
                $(this).show();
            }
        });
    }



    $('.reset-filter').click(function () {
        $(".filter-name").val("");
        filters = [];
        apply_filter('.table tbody', 1, 'any');
        $(".datepicker-here").val("");

    });

    // $(".subject").change(function () {
    //     alert("change subject");
    // });

    $(".filter-name").keyup(function () {
        filters = [];
        apply_filter('.table tbody', 1, $(".filter-name").val());
    });

});
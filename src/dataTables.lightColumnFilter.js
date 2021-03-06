/*!
 * @author Thomas <thansen@solire.fr>
 * @licence CC BY-NC 4.0 http://creativecommons.org/licenses/by-nc/4.0/
 *
 * A light filter column pluggin for jquery.dataTables#1.10
 */
! function(a, b) {
    var c = function(b, c) {
        "use strict";
        var d = function(a, c, d, f) {
                var g, h = this,
                    i = ["dom", "bindEvents", "request"];
                g = f.type in e.filter ? b.extend({}, e.filter[f.type]) : {}, h.options = b.extend({}, g, f), b.each(i, function(a, b) {
                    b in h.options && (h[b] = h.options[b])
                }), h.dataTable = a, h.dataTableColumn = d, h.index = c
            },
            e = function(a, b) {
                var c = this;
                c.columns = [], c.dataTable = null, c.init(a, b)
            };
        return d.prototype = {
            dom: function(a) {},
            bindEvents: function() {},
            request: function() {},
            search: function() {
                var a = this;
                a.dataTableColumn.search(a.request()).draw()
            }
        }, e.prototype = {
            init: function(a, c) {
                var e, f = this;
                f.dataTable = a, e = b("<tr>").appendTo(f.dataTable.table().header()), f.dataTable.columns().eq(0).each(function(a) {
                    var g, h, i, j = f.dataTable.column(a).header().className,
                        k = j.match(/\bnever\b/);
                    k && "responsive" in f.dataTable || (g = a in c ? c[a] : {}, h = new d(f.dataTable, a, f.dataTable.column(a), g), i = b("<th>").appendTo(e), f.columns.push(h), h.dom(i), h.bindEvents())
                }), b(f.dataTable.table().node()).on("column-visibility.dt", function(a, c, d, f) {
                    f ? b("th", e).eq(d - 1).show() : b("th", e).eq(d - 1).hide()
                })
            },
            addFilter: function(a, b) {
                e.filter[a] = b
            }
        }, e["default"] = {
            type: "text"
        }, e.filter = {
            text: {
                dom: function(a) {
                    var c = this;
                    return c.elements = b("<input>", {
                        type: "text"
                    }).appendTo(a), "undefined" != typeof c.options.width ? c.elements.css("width", c.options.width) : c.elements.css("width", "100%"), c.elements
                },
                bindEvents: function() {
                    var b = this,
                        c = 200,
                        d = 0;
                    "time" in b.options && (c = b.options.time), b.elements.keyup(function() {
                        clearTimeout(d), d = a.setTimeout(function() {
                            b.search()
                        }, c)
                    })
                },
                request: function() {
                    var a = this;
                    return a.elements.val()
                }
            },
            select: {
                dom: function(a) {
                    var c, d = this;
                    return c = b("<select>").append("<option></option>"), c.addClass(d.options.cssClass), b.each(d.options.values, function(a, d) {
                        b("<option>").val(d.value).text(d.label).appendTo(c)
                    }), d.elements = c.appendTo(a), "undefined" != typeof d.options.width ? d.elements.css("width", d.options.width) : d.elements.css("width", "100%"), d.elements
                },
                bindEvents: function() {
                    var a = this;
                    a.elements.on("change", function() {
                        a.search()
                    })
                },
                request: function() {
                    var a = this;
                    return a.elements.val()
                }
            },
            dateRange: {
                separator: "~",
                dom: function(a) {
                    var c = this;
                    return c.elements = b("<input>", {
                        type: "text"
                    }).add(b("<input>", {
                        type: "text"
                    })).appendTo(a), "undefined" != typeof c.options.width ? c.elements.css("width", c.options.width) : c.elements.css("width", "50%"), c.elements
                },
                bindEvents: function() {
                    var a = this;
                    a.elements.change(function() {
                        a.search()
                    })
                },
                request: function() {
                    var a = this,
                        c = [];
                    return a.elements.each(function() {
                        c.push(b(this).val())
                    }), c.join(a.options.separator)
                }
            }
        }, b.fn.dataTable.ColumnFilter = e, b.fn.DataTable.ColumnFilter = e, e
    };
    "function" == typeof define && define.amd ? define(["jquery", "datatables"], c) : "object" == typeof exports ? c(require("jquery"), require("datatables")) : jQuery && !jQuery.fn.dataTable.ColumnFilter && c(jQuery, jQuery.fn.dataTable)
}(window, document);
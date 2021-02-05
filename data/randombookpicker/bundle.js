(function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r)
        }, p, p.exports, r, e, n, t)
      }
      return n[i].exports
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o
  }
  return r
})()({
  1: [function(require, module, exports) {

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    function change() {
      try {
        var gReader = require('g-sheets-api')
      } catch (er) {
        gReader = "nope"
      };
      if (gReader == "nope") {
        alert("didn't load g-sheets-api")
      };

      var options = {
        sheetId: '1yzbDN2Rc2bM3ksoUXjNUAVdmoIir9OpUNo95WB0ln_A',
        sheetNumber: 1,
        returnAllResults: true
      }

      gReader(options, results => {
        var resultsF = results.filter(d => d.Status !== 'read');
        var resultsF = resultsF.filter(d => d.Status !== 'DNF');
        var resultsF = resultsF.filter(d => d.Status !== 'in progress');
        var n = getRandomInt(0, resultsF.length);
        var title = resultsF[n]["Title"];
        var res1 = document.getElementById('resTitle');
        res1.textContent = title;
        var author = resultsF[n]["Author"];
        var res2 = document.getElementById('resAuthor');
        res2.textContent = author;
        var resb = document.getElementById('by');
        resb.textContent = "by";
      }).catch(err => {
        alert("Could not read google sheet");
      });
    };
    var btn = document.getElementById('random');
    btn.addEventListener('click', change);

  }, {
    "g-sheets-api": 4
  }],
  2: [function(require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _nodeFetch = _interopRequireDefault(require("node-fetch"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var gsheetsAPI = function gsheetsAPI(sheetId) {
      var sheetNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var errorObj = {
        hasError: true
      };
      var fetchFunc;

      try {
        fetchFunc = window.fetch;
      } catch (err) {
        fetchFunc = _nodeFetch.default;
      }

      try {
        var sheetsUrl = "https://spreadsheets.google.com/feeds/cells/".concat(sheetId, "/").concat(sheetNumber, "/public/values?alt=json-in-script");
        return fetchFunc(sheetsUrl).then(function(response) {
          if (!response.ok) {
            console.log('there is an error in the gsheets response');
            throw new Error('Error fetching GSheet');
          }

          return response.text();
        }).then(function(resultText) {
          var formattedText = resultText.replace('gdata.io.handleScriptLoaded(', '').slice(0, -2);
          return JSON.parse(formattedText);
        }).catch(function(err) {
          throw new Error('Failed to fetch from GSheets API. Check your Sheet Id and the public availability of your GSheet.');
        });
      } catch (err) {
        throw new Error("General error when fetching GSheet: ".concat(err));
      }
    };

    var _default = gsheetsAPI;
    exports.default = _default;
  }, {
    "node-fetch": 5
  }],
  3: [function(require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _gsheetsapi = _interopRequireDefault(require("./gsheetsapi.js"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it;
      if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it) o = it;
          var i = 0;
          var F = function F() {};
          return {
            s: F,
            n: function n() {
              if (i >= o.length) return {
                done: true
              };
              return {
                done: false,
                value: o[i++]
              };
            },
            e: function e(_e) {
              throw _e;
            },
            f: F
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true,
        didErr = false,
        err;
      return {
        s: function s() {
          it = o[Symbol.iterator]();
        },
        n: function n() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        },
        e: function e(_e2) {
          didErr = true;
          err = _e2;
        },
        f: function f() {
          try {
            if (!normalCompletion && it.return != null) it.return();
          } finally {
            if (didErr) throw err;
          }
        }
      };
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }

    function matchValues(valToMatch, valToMatchAgainst, matchingType) {
      try {
        if (typeof valToMatch != 'undefined') {
          valToMatch = valToMatch.toLowerCase().trim();
          valToMatchAgainst = valToMatchAgainst.toLowerCase().trim();

          if (matchingType === 'strict') {
            return valToMatch === valToMatchAgainst;
          }

          if (matchingType === 'loose') {
            return valToMatch.includes(valToMatchAgainst) || valToMatch == valToMatchAgainst;
          }
        }
      } catch (e) {
        console.log("error in matchValues: ".concat(e.message));
        return false;
      }

      return false;
    }

    function filterResults(resultsToFilter, filter, options) {
      var filteredData = []; // now we have a list of rows, we can filter by various things

      return resultsToFilter.filter(function(item) {
        // item data shape
        // item = {
        //   'Module Name': 'name of module',
        //   ...
        //   Department: 'Computer science'
        // }
        var addRow = null;
        var filterMatches = [];

        if (typeof item === 'undefined' || item.length <= 0 || Object.keys(item).length <= 0) {
          return false;
        }

        Object.keys(filter).forEach(function(key) {
          var filterValue = filter[key]; // e.g. 'archaeology'
          // need to find a matching item object key in case of case differences

          var itemKey = Object.keys(item).find(function(thisKey) {
            return thisKey.toLowerCase().trim() === key.toLowerCase().trim();
          });
          var itemValue = item[itemKey]; // e.g. 'department' or 'undefined'

          filterMatches.push(matchValues(itemValue, filterValue, options.matching || 'loose'));
        });

        if (options.operator === 'or') {
          addRow = filterMatches.some(function(match) {
            return match === true;
          });
        }

        if (options.operator === 'and') {
          addRow = filterMatches.every(function(match) {
            return match === true;
          });
        }

        return addRow;
      });
    }

    function processGSheetResults(JSONResponse, returnAllResults, filter, filterOptions) {
      var data = JSONResponse.feed.entry;
      var startRow = 2; // skip the header row(1), don't need it

      var processedResults = [{}];
      var colNames = {};

      var _iterator = _createForOfIteratorHelper(data),
        _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          var cell = item['gs$cell']; // gets cell data

          var val = cell['$t']; // gets cell value

          var columnNum = cell['col']; // gets the col number

          var thisRow = cell['row']; // gets the row number

          var colNameToAdd = colNames[columnNum]; // careful, this will be undefined if we hit it on the first pass
          // don't add this row to the return data, but add it to list of column names

          if (thisRow < startRow) {
            colNames[columnNum] = val;
            continue; // skip the header row
          }

          if (typeof processedResults[thisRow] === 'undefined') {
            processedResults[thisRow] = {};
          }

          if (typeof colNameToAdd !== 'undefined' && colNameToAdd.length > 0) {
            processedResults[thisRow][colNameToAdd] = val;
          }
        } // make sure we're only returning valid, filled data items

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      processedResults = processedResults.filter(function(result) {
        return Object.keys(result).length;
      }); // if we're not filtering, then return all results

      if (returnAllResults || !filter) {
        return processedResults;
      }

      return filterResults(processedResults, filter, filterOptions);
    }

    var gsheetProcessor = function gsheetProcessor(options, callback, onError) {
      return (0, _gsheetsapi.default)(options.sheetId, options.sheetNumber ? options.sheetNumber : 1).then(function(result) {
        var filteredResults = processGSheetResults(result, options.returnAllResults || false, options.filter || false, options.filterOptions || {
          operator: 'or',
          matching: 'loose'
        });
        callback(filteredResults);
      }).catch(function(err) {
        return onError(err.message);
      });
    };

    var _default = gsheetProcessor;
    exports.default = _default;
  }, {
    "./gsheetsapi.js": 2
  }],
  4: [function(require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _gsheetsprocessor = _interopRequireDefault(require("./gsheetsprocessor.js"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var reader = function reader(options, callback, onError) {
      return (0, _gsheetsprocessor.default)(options, function(results) {
        callback(results);
      }, function(error) {
        if (onError) {
          onError(error);
        } else {
          throw new Error("g-sheets-api error: ".concat(error));
        }
      });
    };

    module.exports = reader;
    var _default = reader;
    exports.default = _default;
  }, {
    "./gsheetsprocessor.js": 3
  }],
  5: [function(require, module, exports) {
    (function(global) {
      (function() {
        "use strict";

        // ref: https://github.com/tc39/proposal-global
        var getGlobal = function() {
          // the only reliable means to get the global object is
          // `Function('return this')()`
          // However, this causes CSP violations in Chrome apps.
          if (typeof self !== 'undefined') {
            return self;
          }
          if (typeof window !== 'undefined') {
            return window;
          }
          if (typeof global !== 'undefined') {
            return global;
          }
          throw new Error('unable to locate global object');
        }

        var global = getGlobal();

        module.exports = exports = global.fetch;

        // Needed for TypeScript and Webpack.
        if (global.fetch) {
          exports.default = global.fetch.bind(global);
        }

        exports.Headers = global.Headers;
        exports.Request = global.Request;
        exports.Response = global.Response;
      }).call(this)
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
  }, {}]
}, {}, [1]);

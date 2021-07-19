jQuery(function () {
    sendJson(), initTabs(), autoList();
});



let listArray = [
    {
        "text": "Lorem, isnot",
        "num": "1"
    },
    {
        "text": "Lorem, ipsum dolor.",
        "num": "2"
    },
    {
        "text": "Lorem, isnot",
        "num": "3"
    },
    {
        "text": "Lorem, ipsum dolor.",
        "num": "4"
    },
    {
        "text": "Lorem, isnot",
        "num": "5"
    }
]



function readJson(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send();
}





function sendJson() {
    readJson("js/data.json", function (text) {
        const data = JSON.parse(text);
        const table = document.querySelector('table');
        const tbody = document.querySelector('tbody');
        const btn = document.querySelector('.btn');
        const span = document.querySelector('.after');

        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');

            td1.textContent = data[i].abbr;
            td2.textContent = data[i].name;
            td3.textContent = data[i].sctr;

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tbody.appendChild(tr);
            table.appendChild(tbody);


            if ([i] >= 11) {
                tr.style.display = "none";
            } else if (data.length >= 11) {
                $(function () {
                    $('.btn').toggleClass('show');
                })
            } else if (data.length < 11) {
                span.style.display = "none";
            }

            btn.addEventListener('click', function (e) {
                e.preventDefault();
                tr.style.display = "table-row";
                span.style.display = "none";
                $(function () {
                    $('.show').toggleClass('show');
                })
            })
        }
    });
}



function autoList() {
    const list = document.querySelector('#list');
    const arrayList = listArray;

    for (let j = 0; j < arrayList.length; j++) {
        let li = document.createElement('li');
        let span = document.createElement('span');
        let liNum = arrayList[j].num;
        let liText = arrayList[j].text;

        span.textContent = liNum;
        li.textContent = liText;

        li.appendChild(span);
        list.appendChild(li);
    }

}

function initTabs() {
    jQuery('.tabset').tabset({
        tabLinks: 'a',
        defaultTab: true
    });
};
(function ($, $win) {
    'use strict';

    function Tabset($holder, options) {
        this.$holder = $holder;
        this.options = options;

        this.init();
    }

    Tabset.prototype = {
        init: function () {
            this.$tabLinks = this.$holder.find(this.options.tabLinks);

            this.setStartActiveIndex();
            this.setActiveTab();

            if (this.options.autoHeight) {
                this.$tabHolder = $(this.$tabLinks.eq(0).attr(this.options.attrib)).parent();
            }

            this.makeCallback('onInit', this);
        },

        setStartActiveIndex: function () {
            var $classTargets = this.getClassTarget(this.$tabLinks);
            var $activeLink = $classTargets.filter('.' + this.options.activeClass);
            var $hashLink = this.$tabLinks.filter('[' + this.options.attrib + '="' + location.hash + '"]');
            var activeIndex;

            if (this.options.checkHash && $hashLink.length) {
                $activeLink = $hashLink;
            }

            activeIndex = $classTargets.index($activeLink);

            this.activeTabIndex = this.prevTabIndex = (activeIndex === -1 ? (this.options.defaultTab ? 0 : null) : activeIndex);
        },

        setActiveTab: function () {
            var self = this;

            this.$tabLinks.each(function (i, link) {
                var $link = $(link);
                var $classTarget = self.getClassTarget($link);
                var $tab = $($link.attr(self.options.attrib));

                if (i !== self.activeTabIndex) {
                    $classTarget.removeClass(self.options.activeClass);
                    $tab.addClass(self.options.tabHiddenClass).removeClass(self.options.activeClass);
                } else {
                    $classTarget.addClass(self.options.activeClass);
                    $tab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);
                }

                self.attachTabLink($link, i);
            });
        },

        attachTabLink: function ($link, i) {
            var self = this;

            $link.on(this.options.event + '.tabset', function (e) {
                e.preventDefault();

                if (self.activeTabIndex === self.prevTabIndex && self.activeTabIndex !== i) {
                    self.activeTabIndex = i;
                    self.switchTabs();
                }
                if (self.options.checkHash) {
                    location.hash = jQuery(this).attr('href').split('#')[1]
                }
            });
        },

        resizeHolder: function (height) {
            var self = this;

            if (height) {
                this.$tabHolder.height(height);
                setTimeout(function () {
                    self.$tabHolder.addClass('transition');
                }, 10);
            } else {
                self.$tabHolder.removeClass('transition').height('');
            }
        },

        switchTabs: function () {
            var self = this;

            var $prevLink = this.$tabLinks.eq(this.prevTabIndex);
            var $nextLink = this.$tabLinks.eq(this.activeTabIndex);

            var $prevTab = this.getTab($prevLink);
            var $nextTab = this.getTab($nextLink);

            $prevTab.removeClass(this.options.activeClass);

            if (self.haveTabHolder()) {
                this.resizeHolder($prevTab.outerHeight());
            }

            setTimeout(function () {
                self.getClassTarget($prevLink).removeClass(self.options.activeClass);

                $prevTab.addClass(self.options.tabHiddenClass);
                $nextTab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);

                self.getClassTarget($nextLink).addClass(self.options.activeClass);

                if (self.haveTabHolder()) {
                    self.resizeHolder($nextTab.outerHeight());

                    setTimeout(function () {
                        self.resizeHolder();
                        self.prevTabIndex = self.activeTabIndex;
                        self.makeCallback('onChange', self);
                    }, self.options.animSpeed);
                } else {
                    self.prevTabIndex = self.activeTabIndex;
                }
            }, this.options.autoHeight ? this.options.animSpeed : 1);
        },

        getClassTarget: function ($link) {
            return this.options.addToParent ? $link.parent() : $link;
        },

        getActiveTab: function () {
            return this.getTab(this.$tabLinks.eq(this.activeTabIndex));
        },

        getTab: function ($link) {
            return $($link.attr(this.options.attrib));
        },

        haveTabHolder: function () {
            return this.$tabHolder && this.$tabHolder.length;
        },

        destroy: function () {
            var self = this;

            this.$tabLinks.off('.tabset').each(function () {
                var $link = $(this);

                self.getClassTarget($link).removeClass(self.options.activeClass);
                $($link.attr(self.options.attrib)).removeClass(self.options.activeClass + ' ' + self.options.tabHiddenClass);
            });

            this.$holder.removeData('Tabset');
        },

        makeCallback: function (name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        }
    };

    $.fn.tabset = function (opt) {
        var args = Array.prototype.slice.call(arguments);
        var method = args[0];

        var options = $.extend({
            activeClass: 'active',
            addToParent: false,
            autoHeight: false,
            checkHash: false,
            defaultTab: true,
            animSpeed: 500,
            tabLinks: 'a',
            attrib: 'href',
            event: 'click',
            tabHiddenClass: 'js-tab-hidden'
        }, opt);
        options.autoHeight = options.autoHeight;

        return this.each(function () {
            var $holder = jQuery(this);
            var instance = $holder.data('Tabset');

            if (typeof opt === 'object' || typeof opt === 'undefined') {
                $holder.data('Tabset', new Tabset($holder, options));
            } else if (typeof method === 'string' && instance) {
                if (typeof instance[method] === 'function') {
                    args.shift();
                    instance[method].apply(instance, args);
                }
            }
        });
    };
}(jQuery, jQuery(window)));

'use strict';


define([
    'jquery',
    'underscore',
    'oro/translator',
    'pim/fetcher-registry',
    'pim/job/common/edit/field/select'
], function (
    $,
    _,
    __,
    FetcherRegistry,
    SelectField
) {
    return SelectField.extend({
        /**
         * {@inherit}
         */
        configure: function () {
            return $.when(
                FetcherRegistry.getFetcher('parent-categories-list').fetchAll(),
                SelectField.prototype.configure.apply(this, arguments)
            ).then(function (parentCategoriesList) {
                if (_.isEmpty(parentCategoriesList)) {
                    this.config.readOnly = true;
                    this.config.options = {'NO OPTION': __('dnd_google_shopping.google_category_reader.category.no_category')};
                } else {
                    this.config.options = parentCategoriesList;
                }
            }.bind(this));
        }
    });
});

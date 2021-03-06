  /**
    @class
    <p>TThe top_children query runs the child query with an estimated hits size, 
    and out of the hit docs, aggregates it into parent docs. If there aren’t 
    enough parent docs matching the requested from/size search request, then it 
    is run again with a wider (more hits) search.</p>

    <p>The top_children also provide scoring capabilities, with the ability to 
    specify max, sum or avg as the score type.</p>

    @name ejs.TopChildrenQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    Returns child documents matching the query aggregated into the parent docs.

    @param {Object} qry A valid query object.
    @param {String} type The child type to execute the query on
    */
  ejs.TopChildrenQuery = function (qry, type) {

    if (!isQuery(qry)) {
      throw new TypeError('Argument must be a Query');
    }
    
    var 
      _common = ejs.QueryMixin('top_children'),
      query = _common.toJSON();
    
    query.top_children.query = qry.toJSON();
    query.top_children.type = type;

    return extend(_common, {

      /**
            Sets the query

            @member ejs.TopChildrenQuery
            @param {Object} q A valid Query object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (q) {
        if (q == null) {
          return query.top_children.query;
        }
  
        if (!isQuery(q)) {
          throw new TypeError('Argument must be a Query');
        }
        
        query.top_children.query = q.toJSON();
        return this;
      },

      /**
            Sets the child document type to search against

            @member ejs.TopChildrenQuery
            @param {String} t A valid type name
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      type: function (t) {
        if (t == null) {
          return query.top_children.type;
        }
  
        query.top_children.type = t;
        return this;
      },

      /**
            Sets the scope of the query.  A scope allows to run facets on the 
            same scope name that will work against the child documents. 

            @deprecated since elasticsearch 0.90
            @member ejs.TopChildrenQuery
            @param {String} s The scope name as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scope: function (s) {
        return this;
      },

      /**
            Sets the scoring type.  Valid values are max, sum, or avg. If
            another value is passed it we silently ignore the value.

            @deprecated since elasticsearch 0.90.1, use scoreMode
            
            @member ejs.TopChildrenQuery
            @param {String} s The scoring type as a string. 
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      score: function (s) {
        if (s == null) {
          return query.top_children.score;
        }
  
        s = s.toLowerCase();
        if (s === 'max' || s === 'sum' || s === 'avg' || s === 'total') {
          query.top_children.score = s;
        }
      
        return this;
      },
  
      /**
            Sets the scoring type.  Valid values are max, sum, total, or avg. 
            If another value is passed it we silently ignore the value.

            @member ejs.TopChildrenQuery
            @param {String} s The scoring type as a string. 
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scoreMode: function (s) {
        if (s == null) {
          return query.top_children.score_mode;
        }
  
        s = s.toLowerCase();
        if (s === 'max' || s === 'sum' || s === 'avg' || s === 'total') {
          query.top_children.score_mode = s;
        }
      
        return this;
      },
      
      /**
            Sets the factor which is the number of hits that are asked for in
            the child query.  Defaults to 5.

            @member ejs.TopChildrenQuery
            @param {Integer} f A positive integer value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      factor: function (f) {
        if (f == null) {
          return query.top_children.factor;
        }

        query.top_children.factor = f;
        return this;
      },

      /**
            Sets the incremental factor.  The incremental factor is used when not
            enough child documents are returned so the factor is multiplied by
            the incremental factor to fetch more results.  Defaults to 52

            @member ejs.TopChildrenQuery
            @param {Integer} f A positive integer value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      incrementalFactor: function (f) {
        if (f == null) {
          return query.top_children.incremental_factor;
        }

        query.top_children.incremental_factor = f;
        return this;
      }
      
    });
  };

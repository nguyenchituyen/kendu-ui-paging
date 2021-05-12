import * as React from 'react';

export const DemoConfigurator = (props: any) => {
    const values = props.values;
    return (
      <div className="example-config row">
        <div className="col-md-6">
          <dl>
            <dt>
              Pager type:
            </dt>
            <dd>
              <input
                type="radio"
                name="pager"
                id="numeric"
                className="k-radio"
                value="numeric"
                checked={values.type === 'numeric'}
                onChange={event => props.onChange({ 'type': event.target.value })}
                        />
              <label
                style={{ margin: "7px 3em 7px 0px", lineHeight: '1.2' }}
                className="k-radio-label"
                htmlFor="numeric"
                        >
                Numeric&nbsp;
              </label>

              <input
                type="radio"
                name="pager"
                id="input"
                className="k-radio"
                value="input"
                checked={values.type === 'input'}
                onChange={event => props.onChange({ 'type': event.target.value })}
                        />
              <label
                style={{ margin: "7px 3em 7px 0px", lineHeight: '1.2' }}
                className="k-radio-label"
                htmlFor="input"
                        >
                Input&nbsp;
              </label>
            </dd>
          </dl>
          <dl>
            <dt>
              Max. number of buttons:
            </dt>
            <dd>
              <input
                value={values.buttonCount}
                className="k-textbox"
                type="number"
                onChange={event => props.onChange({ 'buttonCount': event.target.valueAsNumber })}
                        />
            </dd>
          </dl>
        </div>
        <div className="col-md-6 row">
          <div className="col-md-12">
            <input
              className="k-checkbox"
              checked={values.info}
              id="showInfo"
              type="checkbox"
              onChange={event => props.onChange({ 'info': event.target.checked })}
                    />
            <label
              htmlFor="showInfo"
              className="k-checkbox-label"
                    >
              Show info
            </label>
          </div>

          <div className="col-md-12">
            <input
              className="k-checkbox"
              checked={values.pageSizes}
              id="pageSize"
              type="checkbox"
              onChange={event => props.onChange({ 'pageSizes': event.target.checked })}
                    />
            <label
              htmlFor="pageSize"
              className="k-checkbox-label"
                    >
              Show page sizes
            </label>
          </div>
          <div className="col-md-12">
            <input
              className="k-checkbox"
              checked={values.previousNext}
              id="previousNext"
              type="checkbox"
              onChange={event => props.onChange({ 'previousNext': event.target.checked })}
                    />
            <label
              htmlFor="previousNext"
              className="k-checkbox-label"
                    >
              Show previous / next buttons
            </label>
          </div>
        </div>
      </div>
    );
}
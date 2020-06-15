import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms, DataSourceHttpSettings } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps, DataSourceSettings } from '@grafana/data';
import { MyDataSourceOptions, MySecureJsonData } from './types';

const { SecretFormField, FormField } = LegacyForms;

interface Props extends DataSourcePluginOptionsEditorProps<MyDataSourceOptions> {}

interface State {}

export class ConfigEditor extends PureComponent<Props, State> {
  // Secure field (only sent to the backend)
  onAPIKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonData: {
        apiKey: event.target.value,
      },
    });
  };

  onResetAPIKey = () => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        apiKey: false,
      },
      secureJsonData: {
        ...options.secureJsonData,
        apiKey: '',
      },
    });
  };

  onMaxNumberOfMetricTiReturnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      max_number_of_metric_to_return: parseInt(event.target.value, 10),
    };
    onOptionsChange({ ...options, jsonData });
  };

  updateDataSourceSettings = (setting: DataSourceSettings<MyDataSourceOptions, {}>) => {
    const { onOptionsChange, options } = this.props;
    const datasourceSettings = {
      ...options,
      setting,
    };
    onOptionsChange(datasourceSettings);
  };

  render() {
    const { options } = this.props;
    const { jsonData, secureJsonFields } = options;
    const secureJsonData = (options.secureJsonData || {}) as MySecureJsonData;

    return (
      <div className="gf-form-group">
        <div className="gf-form">
          <DataSourceHttpSettings
            defaultUrl="http://historienserver:port/api/grafana/v0"
            dataSourceConfig={options}
            onChange={this.updateDataSourceSettings}
            showAccessOptions={true}
          />
        </div>
        <div className="gf-form">
          <FormField
            label="Max search metric"
            labelWidth={10}
            inputWidth={20}
            onChange={this.onMaxNumberOfMetricTiReturnChange}
            value={jsonData.max_number_of_metric_to_return || ''}
            placeholder="Enter a number"
            tooltip="The mximum number of metric name to return when filling metric name in query editors"
          />
        </div>

        <div className="gf-form-inline">
          <div className="gf-form">
            <SecretFormField
              isConfigured={(secureJsonFields && secureJsonFields.apiKey) as boolean}
              value={secureJsonData.apiKey || ''}
              label="API Key"
              placeholder="secure json field (backend only)"
              labelWidth={6}
              inputWidth={20}
              onReset={this.onResetAPIKey}
              onChange={this.onAPIKeyChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

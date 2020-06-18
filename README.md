# Hurence data historian grafana datasource plugin

More documentation about datasource plugins can be found in the [Docs](https://grafana.com/docs/grafana/latest/plugins/).

This plugin has been made to interact with The Hurence data historian rest api.

## Releases

There is currently only one stable release, here the compatibility matrix :

historian datasource plugin | historian release
--- | --- 
1.0.0 | 1.3.0 


## Development

1. Install dependencies
```BASH
yarn install
```
2. Build plugin in development mode or run in watch mode
```BASH
yarn dev
```
or
```BASH
yarn watch
```
3. Build plugin in production mode
```BASH
yarn build
```

## Description of requests/response for current version

### Query API

Example `timeserie` request from grafana :

```json
{
  "panelId": 1,
  "range": {
    "from": "2016-10-31T06:33:44.866Z",
    "to": "2016-10-31T12:33:44.866Z",
    "raw": {
      "from": "now-6h",
      "to": "now"
    }
  },
  "rangeRaw": {
    "from": "now-6h",
    "to": "now"
  },
  "interval": "30s",
  "intervalMs": 30000,
  "targets": [
    { 
        "target": "upper_50", 
        "refId": "A", 
        "type": "timeserie",
        "tags": {
            "pays": "France"
        },
        "sampling": {
            "algorithm": "FIRST",
            "bucket_size": 100
        }
    },
    { 
        "target": "upper_75", 
        "refId": "B", 
        "type": "timeserie",
        "tags": {
            "pays": "France"
        },
        "sampling": {
            "algorithm": "AVG",
            "bucket_size": 100
        }
    }
  ],
  "format": "json",
  "maxDataPoints": 550
}
```

the plugin will transfer this request to historian with this format :

Note: the sampling option taken in account are the first at the moment.

```json
{
  "from": "2016-10-31T06:33:44.866Z",
  "to": "2016-10-31T12:33:44.866Z",
  "names": [
    {
        "name": "upper_50",
        "refId": "A",
        "tags": {
            "pays": "France"
        }
    },
    {
        "name": "upper_75",
        "refId": "B",
        "tags": {
            "pays": "France"
        }
    }
  ],
  "format": "json",
  "max_data_points": 1000,
  "sampling": {
    "algorithm": "FIRST",
    "bucket_size": 100
  }
}
```


Then the response of the historian expected is like :

```json
[
  {       
    "refId": "A",
    "name":"upper_50",
    "tags": {
        "pays" : "France"
    },
    "datapoints":[
      [622,1450754160000],
      [365,1450754220000]
    ]
  },
  {
    "refId": "B",
    "name":"upper_75",
    "tags": {
        "pays" : "France"
    },
    "datapoints":[
      [861,1450754160000],
      [767,1450754220000]
    ]
  }
]
```

This response will be transfered to grafana as :

```json
[
  {
    "refId": "A",
    "target":"upper_50:[pays:France]",
    "datapoints":[
      [622,1450754160000],
      [365,1450754220000]
    ]
  },
  {
    "refId": "B",
    "target":"upper_75:[pays:France]",
    "datapoints":[
      [861,1450754160000],
      [767,1450754220000]
    ]
  }
]
```


### Search Values API

The endpoint allow user to get existing metric names, tag names and tag values.

```json
{
  "field": "name",
  "query": "temp",
  "limit": 20
}
```

ou

```json
{
  "field": "usine",
  "query": "u",
  "limit": 20
}
```

The response format is

```json
["usine_1", "usine_2"]
```

### Search Metric Tags API

The endpoint allow user to get existing metric names, tag names and tag values.

```json
{}
```

The response format is

```json
["sensor", "usine"]
```
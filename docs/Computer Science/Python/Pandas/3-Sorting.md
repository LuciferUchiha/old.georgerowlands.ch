# Sorting

<!-- WARNING: THIS FILE WAS AUTOGENERATED! DO NOT EDIT! Instead, edit the notebook w/the location & name as this file. -->


```python
import pandas as pd

df_cars = pd.read_csv("data/cars.csv", sep=";")
```


```python
df_cars.sort_values(by="Car")
```
    
<HTMLOutputBlock >




```html
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Car</th>
      <th>MPG</th>
      <th>Cylinders</th>
      <th>Displacement</th>
      <th>Horsepower</th>
      <th>Weight</th>
      <th>Acceleration</th>
      <th>Model</th>
      <th>Origin</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>104</th>
      <td>AMC Ambassador Brougham</td>
      <td>13.0</td>
      <td>8</td>
      <td>360.0</td>
      <td>175.0</td>
      <td>3821.</td>
      <td>11.0</td>
      <td>73</td>
      <td>US</td>
    </tr>
    <tr>
      <th>10</th>
      <td>AMC Ambassador DPL</td>
      <td>15.0</td>
      <td>8</td>
      <td>390.0</td>
      <td>190.0</td>
      <td>3850.</td>
      <td>8.5</td>
      <td>70</td>
      <td>US</td>
    </tr>
    <tr>
      <th>74</th>
      <td>AMC Ambassador SST</td>
      <td>17.0</td>
      <td>8</td>
      <td>304.0</td>
      <td>150.0</td>
      <td>3672.</td>
      <td>11.5</td>
      <td>72</td>
      <td>US</td>
    </tr>
    <tr>
      <th>265</th>
      <td>AMC Concord</td>
      <td>19.4</td>
      <td>6</td>
      <td>232.0</td>
      <td>90.00</td>
      <td>3210.</td>
      <td>17.2</td>
      <td>78</td>
      <td>US</td>
    </tr>
    <tr>
      <th>323</th>
      <td>AMC Concord</td>
      <td>24.3</td>
      <td>4</td>
      <td>151.0</td>
      <td>90.00</td>
      <td>3003.</td>
      <td>20.1</td>
      <td>80</td>
      <td>US</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>84</th>
      <td>Volvo 145e (sw)</td>
      <td>18.0</td>
      <td>4</td>
      <td>121.0</td>
      <td>112.0</td>
      <td>2933.</td>
      <td>14.5</td>
      <td>72</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>187</th>
      <td>Volvo 244DL</td>
      <td>22.0</td>
      <td>4</td>
      <td>121.0</td>
      <td>98.00</td>
      <td>2945.</td>
      <td>14.5</td>
      <td>75</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>215</th>
      <td>Volvo 245</td>
      <td>20.0</td>
      <td>4</td>
      <td>130.0</td>
      <td>102.0</td>
      <td>3150.</td>
      <td>15.7</td>
      <td>76</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>283</th>
      <td>Volvo 264gl</td>
      <td>17.0</td>
      <td>6</td>
      <td>163.0</td>
      <td>125.0</td>
      <td>3140.</td>
      <td>13.6</td>
      <td>78</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>369</th>
      <td>Volvo Diesel</td>
      <td>30.7</td>
      <td>6</td>
      <td>145.0</td>
      <td>76.00</td>
      <td>3160.</td>
      <td>19.6</td>
      <td>81</td>
      <td>Europe</td>
    </tr>
  </tbody>
</table>
<p>407 rows × 9 columns</p>
</div>
```



</HTMLOutputBlock>


```python
df_cars.sort_values(by="Car", ascending=False)
```
    
<HTMLOutputBlock >




```html
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Car</th>
      <th>MPG</th>
      <th>Cylinders</th>
      <th>Displacement</th>
      <th>Horsepower</th>
      <th>Weight</th>
      <th>Acceleration</th>
      <th>Model</th>
      <th>Origin</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>369</th>
      <td>Volvo Diesel</td>
      <td>30.7</td>
      <td>6</td>
      <td>145.0</td>
      <td>76.00</td>
      <td>3160.</td>
      <td>19.6</td>
      <td>81</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>283</th>
      <td>Volvo 264gl</td>
      <td>17.0</td>
      <td>6</td>
      <td>163.0</td>
      <td>125.0</td>
      <td>3140.</td>
      <td>13.6</td>
      <td>78</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>215</th>
      <td>Volvo 245</td>
      <td>20.0</td>
      <td>4</td>
      <td>130.0</td>
      <td>102.0</td>
      <td>3150.</td>
      <td>15.7</td>
      <td>76</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>187</th>
      <td>Volvo 244DL</td>
      <td>22.0</td>
      <td>4</td>
      <td>121.0</td>
      <td>98.00</td>
      <td>2945.</td>
      <td>14.5</td>
      <td>75</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>84</th>
      <td>Volvo 145e (sw)</td>
      <td>18.0</td>
      <td>4</td>
      <td>121.0</td>
      <td>112.0</td>
      <td>2933.</td>
      <td>14.5</td>
      <td>72</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>323</th>
      <td>AMC Concord</td>
      <td>24.3</td>
      <td>4</td>
      <td>151.0</td>
      <td>90.00</td>
      <td>3003.</td>
      <td>20.1</td>
      <td>80</td>
      <td>US</td>
    </tr>
    <tr>
      <th>265</th>
      <td>AMC Concord</td>
      <td>19.4</td>
      <td>6</td>
      <td>232.0</td>
      <td>90.00</td>
      <td>3210.</td>
      <td>17.2</td>
      <td>78</td>
      <td>US</td>
    </tr>
    <tr>
      <th>74</th>
      <td>AMC Ambassador SST</td>
      <td>17.0</td>
      <td>8</td>
      <td>304.0</td>
      <td>150.0</td>
      <td>3672.</td>
      <td>11.5</td>
      <td>72</td>
      <td>US</td>
    </tr>
    <tr>
      <th>10</th>
      <td>AMC Ambassador DPL</td>
      <td>15.0</td>
      <td>8</td>
      <td>390.0</td>
      <td>190.0</td>
      <td>3850.</td>
      <td>8.5</td>
      <td>70</td>
      <td>US</td>
    </tr>
    <tr>
      <th>104</th>
      <td>AMC Ambassador Brougham</td>
      <td>13.0</td>
      <td>8</td>
      <td>360.0</td>
      <td>175.0</td>
      <td>3821.</td>
      <td>11.0</td>
      <td>73</td>
      <td>US</td>
    </tr>
  </tbody>
</table>
<p>407 rows × 9 columns</p>
</div>
```



</HTMLOutputBlock>


```python
df_cars.sort_values(by=["Car", "Model"])
```
    
<HTMLOutputBlock >




```html
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Car</th>
      <th>MPG</th>
      <th>Cylinders</th>
      <th>Displacement</th>
      <th>Horsepower</th>
      <th>Weight</th>
      <th>Acceleration</th>
      <th>Model</th>
      <th>Origin</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>104</th>
      <td>AMC Ambassador Brougham</td>
      <td>13.0</td>
      <td>8</td>
      <td>360.0</td>
      <td>175.0</td>
      <td>3821.</td>
      <td>11.0</td>
      <td>73</td>
      <td>US</td>
    </tr>
    <tr>
      <th>10</th>
      <td>AMC Ambassador DPL</td>
      <td>15.0</td>
      <td>8</td>
      <td>390.0</td>
      <td>190.0</td>
      <td>3850.</td>
      <td>8.5</td>
      <td>70</td>
      <td>US</td>
    </tr>
    <tr>
      <th>74</th>
      <td>AMC Ambassador SST</td>
      <td>17.0</td>
      <td>8</td>
      <td>304.0</td>
      <td>150.0</td>
      <td>3672.</td>
      <td>11.5</td>
      <td>72</td>
      <td>US</td>
    </tr>
    <tr>
      <th>265</th>
      <td>AMC Concord</td>
      <td>19.4</td>
      <td>6</td>
      <td>232.0</td>
      <td>90.00</td>
      <td>3210.</td>
      <td>17.2</td>
      <td>78</td>
      <td>US</td>
    </tr>
    <tr>
      <th>323</th>
      <td>AMC Concord</td>
      <td>24.3</td>
      <td>4</td>
      <td>151.0</td>
      <td>90.00</td>
      <td>3003.</td>
      <td>20.1</td>
      <td>80</td>
      <td>US</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>84</th>
      <td>Volvo 145e (sw)</td>
      <td>18.0</td>
      <td>4</td>
      <td>121.0</td>
      <td>112.0</td>
      <td>2933.</td>
      <td>14.5</td>
      <td>72</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>187</th>
      <td>Volvo 244DL</td>
      <td>22.0</td>
      <td>4</td>
      <td>121.0</td>
      <td>98.00</td>
      <td>2945.</td>
      <td>14.5</td>
      <td>75</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>215</th>
      <td>Volvo 245</td>
      <td>20.0</td>
      <td>4</td>
      <td>130.0</td>
      <td>102.0</td>
      <td>3150.</td>
      <td>15.7</td>
      <td>76</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>283</th>
      <td>Volvo 264gl</td>
      <td>17.0</td>
      <td>6</td>
      <td>163.0</td>
      <td>125.0</td>
      <td>3140.</td>
      <td>13.6</td>
      <td>78</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>369</th>
      <td>Volvo Diesel</td>
      <td>30.7</td>
      <td>6</td>
      <td>145.0</td>
      <td>76.00</td>
      <td>3160.</td>
      <td>19.6</td>
      <td>81</td>
      <td>Europe</td>
    </tr>
  </tbody>
</table>
<p>407 rows × 9 columns</p>
</div>
```



</HTMLOutputBlock>


```python
df_cars.sort_values(by=["Car", "Model"], ascending=[False, True])
```
    
<HTMLOutputBlock >




```html
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Car</th>
      <th>MPG</th>
      <th>Cylinders</th>
      <th>Displacement</th>
      <th>Horsepower</th>
      <th>Weight</th>
      <th>Acceleration</th>
      <th>Model</th>
      <th>Origin</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>369</th>
      <td>Volvo Diesel</td>
      <td>30.7</td>
      <td>6</td>
      <td>145.0</td>
      <td>76.00</td>
      <td>3160.</td>
      <td>19.6</td>
      <td>81</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>283</th>
      <td>Volvo 264gl</td>
      <td>17.0</td>
      <td>6</td>
      <td>163.0</td>
      <td>125.0</td>
      <td>3140.</td>
      <td>13.6</td>
      <td>78</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>215</th>
      <td>Volvo 245</td>
      <td>20.0</td>
      <td>4</td>
      <td>130.0</td>
      <td>102.0</td>
      <td>3150.</td>
      <td>15.7</td>
      <td>76</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>187</th>
      <td>Volvo 244DL</td>
      <td>22.0</td>
      <td>4</td>
      <td>121.0</td>
      <td>98.00</td>
      <td>2945.</td>
      <td>14.5</td>
      <td>75</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>84</th>
      <td>Volvo 145e (sw)</td>
      <td>18.0</td>
      <td>4</td>
      <td>121.0</td>
      <td>112.0</td>
      <td>2933.</td>
      <td>14.5</td>
      <td>72</td>
      <td>Europe</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>265</th>
      <td>AMC Concord</td>
      <td>19.4</td>
      <td>6</td>
      <td>232.0</td>
      <td>90.00</td>
      <td>3210.</td>
      <td>17.2</td>
      <td>78</td>
      <td>US</td>
    </tr>
    <tr>
      <th>323</th>
      <td>AMC Concord</td>
      <td>24.3</td>
      <td>4</td>
      <td>151.0</td>
      <td>90.00</td>
      <td>3003.</td>
      <td>20.1</td>
      <td>80</td>
      <td>US</td>
    </tr>
    <tr>
      <th>74</th>
      <td>AMC Ambassador SST</td>
      <td>17.0</td>
      <td>8</td>
      <td>304.0</td>
      <td>150.0</td>
      <td>3672.</td>
      <td>11.5</td>
      <td>72</td>
      <td>US</td>
    </tr>
    <tr>
      <th>10</th>
      <td>AMC Ambassador DPL</td>
      <td>15.0</td>
      <td>8</td>
      <td>390.0</td>
      <td>190.0</td>
      <td>3850.</td>
      <td>8.5</td>
      <td>70</td>
      <td>US</td>
    </tr>
    <tr>
      <th>104</th>
      <td>AMC Ambassador Brougham</td>
      <td>13.0</td>
      <td>8</td>
      <td>360.0</td>
      <td>175.0</td>
      <td>3821.</td>
      <td>11.0</td>
      <td>73</td>
      <td>US</td>
    </tr>
  </tbody>
</table>
<p>407 rows × 9 columns</p>
</div>
```



</HTMLOutputBlock>


```python
df_cars.sort_index
```

<CodeOutputBlock lang="python">

```
    <bound method DataFrame.sort_index of                            Car     MPG Cylinders Displacement Horsepower  \
    0                       STRING  DOUBLE       INT       DOUBLE     DOUBLE   
    1    Chevrolet Chevelle Malibu    18.0         8        307.0      130.0   
    2            Buick Skylark 320    15.0         8        350.0      165.0   
    3           Plymouth Satellite    18.0         8        318.0      150.0   
    4                AMC Rebel SST    16.0         8        304.0      150.0   
    ..                         ...     ...       ...          ...        ...   
    402            Ford Mustang GL    27.0         4        140.0      86.00   
    403          Volkswagen Pickup    44.0         4        97.00      52.00   
    404              Dodge Rampage    32.0         4        135.0      84.00   
    405                Ford Ranger    28.0         4        120.0      79.00   
    406                 Chevy S-10    31.0         4        119.0      82.00   
    
         Weight Acceleration Model  Origin  
    0    DOUBLE       DOUBLE   INT     CAT  
    1     3504.         12.0    70      US  
    2     3693.         11.5    70      US  
    3     3436.         11.0    70      US  
    4     3433.         12.0    70      US  
    ..      ...          ...   ...     ...  
    402   2790.         15.6    82      US  
    403   2130.         24.6    82  Europe  
    404   2295.         11.6    82      US  
    405   2625.         18.6    82      US  
    406   2720.         19.4    82      US  
    
    [407 rows x 9 columns]>
```

</CodeOutputBlock>


```python
df_cars["Car"].sort_values()
```

<CodeOutputBlock lang="python">

```
    104    AMC Ambassador Brougham
    10          AMC Ambassador DPL
    74          AMC Ambassador SST
    265                AMC Concord
    323                AMC Concord
                    ...           
    84             Volvo 145e (sw)
    187                Volvo 244DL
    215                  Volvo 245
    283                Volvo 264gl
    369               Volvo Diesel
    Name: Car, Length: 407, dtype: object
```

</CodeOutputBlock>
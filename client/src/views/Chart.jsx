import React from 'react'
import { OrdinalFrame } from 'semiotic'
import httpClient from '../httpClient'

          class Chart extends React.Component {
            state = {
                sales: []
            }

            componentDidMount() {
                httpClient.getAllSales().then((serverResponse) => {
                    const obj = {}
                    serverResponse.data.forEach((s) => {
                        obj[s.company] = obj[s.company] === undefined ? 0 + s.price : obj[s.company] + s.price
                    })
                    var arr = []
                    for(let c in obj) {
                        arr.push({
                            name: c,
                            value: obj[c]
                        })
                    }
                    console.log(arr)
                    this.setState ({
                        sales : arr
                    })
                })
            }
        
            
            render() {
                return (
                    <div>
                        <OrdinalFrame
                            title={"Sales by Company"}
                            size={[1000, 800]}
                            data={this.state.sales}
                            oAccessor={"name"}
                            rAccessor={d => d.value}
                            style={{ fill: "#00a2ce", stroke: "white" }}
                            type={"bar"}
                            oLabel={d => (
                            <text transform="translate(-15,0)rotate(45)">{d}</text>
                            )}
                            axis={{ orient: "left", label: "$" }}
                            margin={{ left: 100, bottom: 100, right: 5, top: 55 }}
                            oPadding={5}
                        />
                    </div>
                )
            }
        }
        
        export default Chart
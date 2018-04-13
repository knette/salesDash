import React from 'react'
import { OrdinalFrame } from 'semiotic'

const barChartData = [
    { user: "Jason", tweets: 10, retweets: 5, favorites: 15 },
    { user: "Susie", tweets: 5, retweets: 100, favorites: 100 },
    { user: "Matt", tweets: 20, retweets: 25, favorites: 50 },
    { user: "Betty", tweets: 30, retweets: 20, favorites: 10 }
  ]; 

          class Chart extends React.Component {
            state = {
                fields: { name: '', email: '', password: ''}
            }
        
            
            render() {
                const { name, email, password } = this.state.fields
                return (
                    <div>
                        <OrdinalFrame
                            title={"Sales by Customer"}
                            size={[600, 800]}
                            data={barChartData}
                            oAccessor={"user"}
                            rAccessor={d => d.retweets + d.favorites}
                            style={{ fill: "#00a2ce", stroke: "white" }}
                            type={"bar"}
                            oLabel={d => (
                            <text transform="translate(-15,0)rotate(45)">{d}</text>
                            )}
                            axis={{ orient: "left", label: "Sales" }}
                            margin={{ left: 70, bottom: 50, right: 5, top: 55 }}
                            oPadding={5}
                        />
                    </div>
                )
            }
        }
        
        export default Chart
import React, { useState } from 'react';
import { useHttp } from '../hooks/http'
import { Button, Menu, Icon, Spin, Avatar, notification } from 'antd'
import SideDrawer from './common/SideDrawer'

import "antd/dist/antd.css";
import '../styles/App.css';

const App = props => {

    const [drawerVisible, setDrawerVisible] = useState(false)

    const [roster, setRoster] = useState(null)

    const [loading, fetchedData] = useHttp('https://statsapi.web.nhl.com/api/v1/teams', [])

    //Fetch the roster when a team is clicked//
    const handleTeamSelect = (item) => {
        setDrawerVisible(false)

        // fetch(`https://statsapi.web.nhl.com/api/v1/teams/${item.key}/roster`,{ 
        //     method: "GET"
        // })
        // .then(res => res.json())
        // .then(body => setRoster(body.roster), ()=> {
        //     this.setState({ loading: false })
        // }))
        // .catch(err => {
        //     notification['error']({
        //         message: 'Network Error',
        //         description: err.message
        //     })
        // })
    }
        
    //Render list for drawer menu//
    const renderMenu = (teams, loading) => {
        if(loading) 
            return <Spin spinning={loading}></Spin>

        return (
            <Menu style={{width: window.innerWidth/6, marginLeft: -window.innerWidth/60 }} theme='light'>
                {teams.map(team => { 
                    return (
                        <Menu.Item onClick={team => handleTeamSelect(team)} key={team.id}>
                            <Avatar className='logo' src={require(`../assets/${team.abbreviation}.png`)}/>{team.name}
                        </Menu.Item>
                    )
                })}
            </Menu>
        )
    }

    //Render the table title base on team clicked//
    // renderTableTitle = (teams, loading, id) => {
    //     if(loading || !teams.length || id === 0)
    //         return <h1>No Roster</h1>
        
    //     const teamName = teams.filter(team => parseInt(team.id) === parseInt(id))

    //     return <h1>{teamName[0].name}</h1>
    // }
    
    if(fetchedData) {
        return (
            <React.Fragment>
                <div className='header-container'>
                    <div>
                        <Button onClick={() => setDrawerVisible(true)}>
                            <Icon type='right' />
                        </Button>
                    </div>

                    <div className='table-title-container'>
                        {/* {this.renderTableTitle(fetchedData.teams, loading, teamID)} */}
                    </div>
                </div>

                <SideDrawer
                    drawerVisible={drawerVisible}
                    drawerTitle='NHL Title'
                    pos='left'
                    width={window.innerWidth/6}
                    closeDrawer={() => setDrawerVisible(false)}
                    renderMenu={() => renderMenu(fetchedData.teams, loading)}
                />
            </React.Fragment>
        )
    }
    return <div></div>
}

export default App;

import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import './App.css';

const getParkingSpaces = 'http://manyi.ga:4000/getparkingspaces';
const getParkingSpacesDebug = 'http://localhost:4000/getparkingspaces';

//todo: Use different icons for different parking space, like green for free, red for ticket or something
var parkingIconFree = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -25]
});

var parkingIconPrivate = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAACEUlEQVRYhb2XzS4DURTH/zPTailqaOMrVCREKjYisfMAFtIFCxuWHsFGrGy8gKeQIBIPwANYSEOli7IgJBoltE07HZnGDJ25d+6ZttP/bu659/zOuR/n3pGi+haI0hndJMrQgMDOcsyzc4E8iMN5UANClT8/5aCOisIc44CxIMzoDYcVRZSYNb4BJPMA4Qppui0ZmfIClXmGUpAUtSXb1DX4s2fii2Q7tc3SzUz8ApjSRefEkqwDi28q+gMRfGjfuFbz0IiTTYLs3GxgcKGK3VjKalsv7CFbe0VOLYsDFHUwtmYdgFRD+3H0AJvqKsbyzm3lGbKcjTkApoz2pefp1iERrdvV3iW520mQu6FnHOKUaTPa0333rUMehqsoPilMUOkNuJ0oCSHGfUI6J9uZFYzNxgGpVv/+fACOJk9QI5Q4KXG2n3xfy6UpIEMDXxI+enSS83r/86l582b089RLnSuQoYw67IdzpRhI4HfhzTY/pqy+cr5NV+/F+IxFsj2J2pmNtf98yaTnLpr8/22HeHs9cPQ9V7h1gzii8CrWeN4ztZW1ccwGc00iV6MjTWVxOcIc5/bgbiYb5ppyd1c4PRj34j3sUjVEvw5esuHuTNdzYtYekUT9XCFad/WRAhH1E554UZSUbIUQUZSUbEm1Sy4rvHNDKkMkSC2kvVD6tQT5lT1qcjHt6E8QVWb09CsBwA9wqYyUgzsAGQAAAABJRU5ErkJggg==',
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -25]
});

var parkingIconCommercial = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAEBklEQVRYha2Xz28bRRTHvzP7y7uJ41DTOk1Ly6EXoNxi1DiHSiRw5cQV7nBDcEb8A9y48CdwROqhlThQE5U0F9SfCAkqARV1hY1/xL/2xwx6m11nbe+s12m/0drxvDfvM29m580uE598hJySKW4sT1d9gT0tsMquBKogDwC8Ff8IGEfTWoPHT9wN4aPoDWAHbhL4EMDVPJDJ6NrGSggwhY+S24clvInTmOtwuYGmWYQmBda9PqKBydmsZiETwDP7DEruUXKkU7KEH16koWbieWEd50btZJwJKAmR8dT0dBsbw1Zq8DTRQOiirCgjyiwJ4rN9CBClvrTKbi+c4lnFmch4DVSAvlZAwE6mWpMSK8Fozi8GRXHCbPTkOqgAaXCfcfQ1C4YMwhsjKfKlaY+nbbImNE1FfzgHIOeCP0LTWQer1rB2cRNHzxoQB/s4c9QK7WkaaNYknh6AuRqkmQYgsBm4+O7DL/Dx9Tcm7a/Qx2sX8LS+j7Unv0Lj+txdGMcTYAEnQOpQIsem7kwBJqpu48Jnn+NPu6y8zSMx7i8oP79dmtvAU/rr6rVMuwA4D8Az65O3upodxHEwZlqmD2eQmZCzvz/KDFC+dwBLBko7AyTdGp7Sg9a3/y9uP/471XbvSQOXW08zB+GBjwgyGDBdmU1ZjvHmN1/hxg934YmT9pu//IHy11+iIuc3ZKzjuLLP3v70241bOPynIseZI3rOC5BSoqvbcPxRWCqyAKQGs/A+q54PT8YODLcEz8jscQp1YHgleGa4XU2Ibn/hIbmcKJ6FoIO4ClfN2mYfXLw8BDAAD67btcoE8sCtuxZE92UBaIM7CHoHw58EkudJEb7bgLnowSGXmjDkFtu6EvvyxD8VA7J96siRRtBQgOg8lgfNOQipBL/1otl0oMk9uXUp2TYF0SCvFCDai4qmSpSFDfHfIfu5p4SQ3kP1Ms3paSB9cLmLrddn2+cgd3GnR6OhUS0H0MO1OMR0FqkQ0o67c7ELbal9Q/usOqptptlSIffNH4crCLp5s6EsVhB0HhXq82e4CkJ6x6xVBjmrwBhMXLN2NlR2JeShW3dNiNaimtaFIS2I5v3xbeVBr4SQdu1tykZ97EVZ7Dk1ZRYLIVR7HATNDtIPNWon+51BPXNaMyGkd+3t854iG2on+6IYCyGUDd05nZkNSuWHsogr7QtBSHuN3bMe2NQDrw74DoLMtVgKsl+5JYvw2w1mhdk0YMlV+Lkrdi4IyYI4V5DCH0KjY9Wn33n76h/gVcTPd5L+JMAYCy8hBOiVhDEOKQW+Z63wYcMGjLAf9ZHkwyHJl5+MmZ5sGL2VMB5lchzpOLUEgHMeAWT4nXgPDL9DAIUiOz8eSNxObaEA/A/CcrzIz8mzdAAAAABJRU5ErkJggg==',
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -25]
});

var seflIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAE6UlEQVRIS41W628UVRT/nTszu9vdttt2aWFLhe0DKi0FLGJAQgwSX9ASJIKoxG/GPwDpVv0q0TboZ/1o1FBQY+iiJIglERBfrdJuq5THQkm7lT7oln3PzL1mZjPb3bZUz6eZ8/qd+ztnzh3CEnL0u4Fa0nCIiHaC80YQ8xjuAnySiA2BRI/O+YnjezeGHpaGFjO0n+mvEYJ1gvP9YGxRn2wc5wKMfUWa1PbBi+tuz8+3INgfCL4O0MeAKFjqdPNtHIgzEm92tDR9nmvLA/AHBtsB8f5iidVEHFo8ZpoUpwtygXNxfCGOduxtOm4ZswCZyvFpbhTXddwfHkIkNIx0dDYvoa2oGCXVa1G6pgEkSXk2ATrc2dr4haE0ATKcS8FcWpIzUxi93AM1FoXNXQJHmcesWggBPZlAanoKqcgMFFchqrbvgr2kbA6EI6bJrPHDPQ13TAD/6f4vwdhLloeRfKTnrFmZu74Bxd5HoDgLIcmK6aJrKtR4FLNjI4hcG4IQHKt37s4DEcDJztb1h8gYRaaK69a0GLSEzn4Nrmsob94Kd+XqBRRYhQhdR2TsNib6fgGTFdQ8v3/Ol3NBXKmhtu6Bd4noPStocugqJoN9WLZpCzwGv8SWHCaj+unhICau9qK8aTM86zbk+NPb5A8EzwPYZWlvBE6C2WxYtXM3ZJsdRpVaKg49lYbQNNONZBmS3QbZ7jQr1lNJ3LlwFkJTUdtycA6A6Hvyn+4Pg7EVhjYxPYk75wOQChxQCgrNBhvBljAlMy1c1bM6ye4wG60mYtATCfie2weHuzRj5zRK/u5gGgSzezM3r2G89yfoWhqSbMujxkhe/fLj5qIIdfWCa3MgZuPVFCTFjormrSirW5fJD57OA4iEriP82yXougbF7gBT7CCZQYvGQDLBd7DZyI/bp/oguIDsckFoHFxNQU0mzCmreOwJlK1pnANo6+4fI2JeQ6Ml4jB64PRWothXCxADkQQ1Novp4J9m9YYIMCxr2gTZWQQhdEBwREI3kBgPw/fCfjiK3DkULWhyFwxefc/szU6Qlkog/OtFxMKjZqCrsgreLTsg2x0ZQMEROtcNnkqhtuUAiGUn7xz5zwy8A0HHLMLDv19C5NZ1VO14FoXeldk+hHsvI3Jz2Hx319bDu/nJrO1BeASjF3+Au24tvM3bs3oitNNb3VerJUE3rQ8t9SCCkQvfmWwYpzAWmyHjfVcwc+Nv87mk7lGsaN5mPmuxGELnT5t0rtq1B3ZXkcU/50yuyayKQPAUgAMW9P3QMO798bPZtMqtT8FZUbkoQOzeKMau/AiuaVi+eRtKfHXZ6gXxE50tG17NLLtv/vLpsj7IAHMHG+tiJnQN00P90JIJFHjKoaWSUKMPzARKYREkmwPJ6QlIjgJ4GjeitLo+y70OHrXr1HBsX9PduXV9ZuAwBH1mlSA4R3xqHDO3hhEbuwuuZr5iS5iiwLWyCu6aerjKluc21tjRr3S0rO8yfPMunPbAwFEB6sxNpKVTSMdmkZj8B8n7U2aIvdQD57IK2FzF5jqZJ0c6Wtd/ZOkWXJltgcHXSBefQEKmu/9TdOhRiaQ3rMofCmAYjnw7tFrivIM4P/hflz4H50Q4SUJq72htHJlfz5J/DEbzhcwPgfA0dDRwppcbCRiXJsDEIBF6VGJdxs31sIP+C0dyFHmCZZtwAAAAAElFTkSuQmCC',
    iconSize: [24, 24],
    iconAnchor: [12, 12],

});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                lat: -37.812551,
                lng: 144.965181,
            },
            //isUserLocated : false,
            //NOTE: The end product should set this value to false. So the application know the correct location is fetched
            isUserLocated: true,
            zoom: 16,
            spaces: [],
            test: "",
            selectSpaceType: "0",
            selectSpaceName: "",
            selectSpaceAddress: "",
            selectSpaceStatus:"",
            bookingWindow:false
        };

        this.toggle = this.toggle.bind(this);

    }
    toggle() {
        this.setState(prevState => ({
            bookingWindow: !prevState.bookingWindow
        }));
    }

    componentDidMount() {
        //console.log("componentDidMount");
        //This part read the user's location.
        /*
        navigator.geolocation.getCurrentPosition((position => {
            this.setState({
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                isUserLocated: true,
                zoom:16
            })
        }));
        */
        //this.getServerStatus();
        this.getParkingSpaces();

    }



    getParkingSpaces = () => {
        window.console.log("FETCH STARTED");
        //Offset: The area range
        //1: ~113KM
        fetch(getParkingSpaces + '?lat=' + this.state.location.lat + '&lng=' + this.state.location.lng + '&offset=1', {
            method: 'POST',
//            headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json',
//            },
            //body: data
        }).then(res => res.json())
            .then(spaces => this.setState({spaces}));
        //this.forceUpdate();

    };

    getServerStatus = () => {
        fetch(getParkingSpaces + '/test')
            .then(res => res.json())
            .then(test => this.setState({test}))
    };



    clickMarker = (e) => {
        console.log((e.target.options.id).substr(5));

        this.setState({
            selectSpaceName: this.state.spaces[(e.target.options.id).substr(5)].spaceName,
            selectSpaceAddress:this.state.spaces[(e.target.options.id).substr(5)].spaceAddress,
            selectSpaceType:this.state.spaces[(e.target.options.id).substr(5)].spaceType
        })

    };

    createMakers = () => {
        window.console.log(this.state.spaces.length);
        //window.console.log(JSON.parse(this.state.test));
        let makers = [];

        if (this.state.spaces != null) {
            window.console.log(this.state.spaces);
            // Outer loop to create parent
            for (let i = 0; i < this.state.spaces.length; i++) {
                let position = [this.state.spaces[i].spaceLat, this.state.spaces[i].spaceLng];
                //Create the maker and add the position
                switch(this.state.spaces[i].spaceType)
                {
                    //0: FREE, 1: Commercial, 2: Private
                    case "0":
                    default:
                        makers.push(<Marker onClick={this.clickMarker} id={"maker"+i} key={"maker"+this.state.spaces[i].spaceID} position={position} icon={parkingIconFree}  > <Popup><b>{this.state.spaces[i].spaceName}</b><br/>{this.state.spaces[i].spaceAddress}</Popup></Marker>);
                        break;
                    case "1":
                        makers.push(<Marker onClick={this.clickMarker} id={"maker"+i} key={"maker"+this.state.spaces[i].spaceID} position={position} icon={parkingIconCommercial} > <Popup><b>{this.state.spaces[i].spaceName}</b><br/>{this.state.spaces[i].spaceAddress}</Popup></Marker>);
                        break;
                    case "2":
                        makers.push(<Marker onClick={this.clickMarker} id={"maker"+i} key={"maker"+this.state.spaces[i].spaceID} position={position} icon={parkingIconPrivate} ><Popup><b>{this.state.spaces[i].spaceName}</b><br/>{this.state.spaces[i].spaceAddress}</Popup> </Marker>);
                        break;
                }

            }
        }

        return makers
    };

    render() {


        const position = [this.state.location.lat, this.state.location.lng];
        const position2 = [-37.816610, 145.132740];
        const position3 = [-37.812110, 145.128520];


        return (
            <div className="App">
                <div className="bg-info">

                    <Map className="map" center={position} zoom={this.state.zoom} >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">DEAKIN UNI</a>'
                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        />
                        {this.state.isUserLocated ?
                            <Marker position={position} icon={seflIcon}>

                            </Marker> : ""
                        }
                        {this.createMakers()}
                        <Marker position={position2} icon={parkingIconFree}/>
                        <Marker position={position3} icon={parkingIconFree}> </Marker>

                    </Map>

                    <div className="ParkingDesc">
                        <Card>

                            <CardBody>
                                <CardTitle id={"sitename"} >{ this.state && this.state.selectSpaceName ? this.state.selectSpaceName : 'Packing Space Name' }</CardTitle>
                                <CardText  id={"siteaddress"} >
                                    { this.state && this.state.selectSpaceAddress ? this.state.selectSpaceAddress : 'Packing Space Address' }
                                </CardText>
                                <Row>
                                    <Col>Price: <p className={"priceTag"}>${(2 + (Math.random() * (20-2))).toFixed(0)}</p></Col>
                                    <Col>Charger:  <p className={"chargerTag"}>{Math.random() >= 0.5 ? "Have":"No"}</p></Col>
                                    <Col>Status:  <p className={"statusTag"}>{Math.random() >= 0.5 ? "Full":"Available"}</p></Col>
                                </Row>

                                {this.state.selectSpaceName ?
                                <Row>
                                    <Col><Button className="btn-block">Navigation</Button></Col>
                                    {/* SpaceType: 0: Public Free, 1: Commercial, 2: Private.
                                     // You cannot booking public free parking space, so once the spacetype=0, the booking button is disabled*/}
                                    {this.state.selectSpaceType !== "0" ?
                                        <Col><Button className="btn-block" onClick={this.toggle}>Booking</Button></Col>
                                        :
                                        <Col><Button className="btn-block disabled">Booking</Button></Col>
                                    }
                                </Row> :
                                    <Col><Button className="btn-block">I am feeling lucky</Button></Col>
                                }
                            </CardBody>
                        </Card>
                    </div>

                    <Modal isOpen={this.state.bookingWindow} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Booking</ModalHeader>
                        <ModalBody>
                            Confirm to booking?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Yes</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>

            </div>
        );
    }
}

export default App;

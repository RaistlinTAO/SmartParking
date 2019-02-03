import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container, Row, Col,Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import './App.css';

//todo: Use different icons for different parking space, like green for free, red for ticket or something
var parkingIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
    iconSize: [24, 36],
    iconAnchor: [12, 36],
});

var seflIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAE6UlEQVRIS41W628UVRT/nTszu9vdttt2aWFLhe0DKi0FLGJAQgwSX9ASJIKoxG/GPwDpVv0q0TboZ/1o1FBQY+iiJIglERBfrdJuq5THQkm7lT7oln3PzL1mZjPb3bZUz6eZ8/qd+ztnzh3CEnL0u4Fa0nCIiHaC80YQ8xjuAnySiA2BRI/O+YnjezeGHpaGFjO0n+mvEYJ1gvP9YGxRn2wc5wKMfUWa1PbBi+tuz8+3INgfCL4O0MeAKFjqdPNtHIgzEm92tDR9nmvLA/AHBtsB8f5iidVEHFo8ZpoUpwtygXNxfCGOduxtOm4ZswCZyvFpbhTXddwfHkIkNIx0dDYvoa2oGCXVa1G6pgEkSXk2ATrc2dr4haE0ATKcS8FcWpIzUxi93AM1FoXNXQJHmcesWggBPZlAanoKqcgMFFchqrbvgr2kbA6EI6bJrPHDPQ13TAD/6f4vwdhLloeRfKTnrFmZu74Bxd5HoDgLIcmK6aJrKtR4FLNjI4hcG4IQHKt37s4DEcDJztb1h8gYRaaK69a0GLSEzn4Nrmsob94Kd+XqBRRYhQhdR2TsNib6fgGTFdQ8v3/Ol3NBXKmhtu6Bd4noPStocugqJoN9WLZpCzwGv8SWHCaj+unhICau9qK8aTM86zbk+NPb5A8EzwPYZWlvBE6C2WxYtXM3ZJsdRpVaKg49lYbQNNONZBmS3QbZ7jQr1lNJ3LlwFkJTUdtycA6A6Hvyn+4Pg7EVhjYxPYk75wOQChxQCgrNBhvBljAlMy1c1bM6ye4wG60mYtATCfie2weHuzRj5zRK/u5gGgSzezM3r2G89yfoWhqSbMujxkhe/fLj5qIIdfWCa3MgZuPVFCTFjormrSirW5fJD57OA4iEriP82yXougbF7gBT7CCZQYvGQDLBd7DZyI/bp/oguIDsckFoHFxNQU0mzCmreOwJlK1pnANo6+4fI2JeQ6Ml4jB64PRWothXCxADkQQ1Novp4J9m9YYIMCxr2gTZWQQhdEBwREI3kBgPw/fCfjiK3DkULWhyFwxefc/szU6Qlkog/OtFxMKjZqCrsgreLTsg2x0ZQMEROtcNnkqhtuUAiGUn7xz5zwy8A0HHLMLDv19C5NZ1VO14FoXeldk+hHsvI3Jz2Hx319bDu/nJrO1BeASjF3+Au24tvM3bs3oitNNb3VerJUE3rQ8t9SCCkQvfmWwYpzAWmyHjfVcwc+Nv87mk7lGsaN5mPmuxGELnT5t0rtq1B3ZXkcU/50yuyayKQPAUgAMW9P3QMO798bPZtMqtT8FZUbkoQOzeKMau/AiuaVi+eRtKfHXZ6gXxE50tG17NLLtv/vLpsj7IAHMHG+tiJnQN00P90JIJFHjKoaWSUKMPzARKYREkmwPJ6QlIjgJ4GjeitLo+y70OHrXr1HBsX9PduXV9ZuAwBH1mlSA4R3xqHDO3hhEbuwuuZr5iS5iiwLWyCu6aerjKluc21tjRr3S0rO8yfPMunPbAwFEB6sxNpKVTSMdmkZj8B8n7U2aIvdQD57IK2FzF5jqZJ0c6Wtd/ZOkWXJltgcHXSBefQEKmu/9TdOhRiaQ3rMofCmAYjnw7tFrivIM4P/hflz4H50Q4SUJq72htHJlfz5J/DEbzhcwPgfA0dDRwppcbCRiXJsDEIBF6VGJdxs31sIP+C0dyFHmCZZtwAAAAAElFTkSuQmCC',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});

class App extends Component {

    state = {
        location:{
            lat: -37.849690,
            lng: 145.114520,
        },
        isUserLocated : false,
        zoom: 3,
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position => {
            this.setState({
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                isUserLocated: true,
                zoom:16
            })
        }))
    }


    render() {
        const position = [this.state.location.lat, this.state.location.lng];
        const position2 = [-37.816610, 145.132740];
        const position3 = [-37.812110, 145.128520];
        return (
            <div className="App">
                <div className="bg-info">
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">Parking Hero</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen='false' navbar>
                            <Nav className="ml-auto" navbar>


                            </Nav>
                        </Collapse>
                    </Navbar>
                    <Map className="map" center={position} zoom={this.state.zoom}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">DEAKIN UNI</a>'
                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        />
                        {this.state.isUserLocated ?
                            <Marker position={position} icon={seflIcon} >

                            </Marker> : ""
                        }

                        <Marker position={position2} icon={parkingIcon} >

                        </Marker>
                        <Marker position={position3} icon={parkingIcon} >

                        </Marker>

                    </Map>

                    <div className="ParkingDesc">
                        <Card>

                            <CardBody>
                                <CardTitle>Parking Site Name</CardTitle>
                                <CardText>Make some design here  Make some design hereMake some design hereMake some design hereMake some design hereMake some design here </CardText>
                                <Button className="btn-block">Parking</Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;

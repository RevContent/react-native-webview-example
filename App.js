import Constants from 'expo-constants';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { useState } from 'react';

export default function App() {
  const [viewHeight, setViewHeight] = useState(null);
  const [webViewHeight, setWebViewHeight] = useState(null);
  const onMessage = event => {
    setWebViewHeight(Number(event.nativeEvent.data));
  };

  // A timeout with a react native post message is injected into the document so that
  // it can send the dimensions of the widget back to the app. This allows for resizing
  // of any parent elements in your app that may need to use the size of the document
  // loaded in the webview
  const injectedJavaScript = `
   setTimeout(() => {
    window.ReactNativeWebView.postMessage(
      Math.max(document.body.offsetHeight, document.body.scrollHeight)
    );
   }, 1000);
  `;

  const onLayout = event => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  const onShouldStartLoadWithRequest = request => {
    if (request.navigationType === 'click') {
      Linking.openURL(request.url);
      return false;
    }
    return true;
  };

  return (
    <View
      style={styles.container}
      onLayout={onLayout}>
      <View style={styles.statusBar} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          height: viewHeight + webViewHeight
        }}>
        <Text style={styles.h1}>Lorem ipsum</Text>
        <Text style={styles.p}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu
          diam lacus. Proin quis quam feugiat, suscipit quam eget, ultricies
          justo. Proin elementum, lorem id ullamcorper porta, lectus eros
          lobortis odio, sit amet vulputate ipsum mauris fringilla ligula. Donec
          vulputate consectetur tristique. Quisque sollicitudin lacus et
          vulputate elementum. In pellentesque justo ligula, aliquet vestibulum
          risus suscipit ac. Aenean diam arcu, consequat quis ipsum at, dictum
          convallis erat. Morbi id enim at sem luctus porttitor. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Duis eget sapien tincidunt, iaculis quam vel, iaculis
          libero. Integer laoreet tellus enim, nec finibus lorem congue ac.
          Praesent nisi lacus, venenatis sed elementum nec, consectetur a arcu.
          Vestibulum venenatis neque eget maximus imperdiet.
        </Text>
        <Text style={styles.p}>
          Nullam vel magna vestibulum, dictum enim eu, ornare lacus. Maecenas
          sapien sem, hendrerit sed gravida in, euismod eu magna. In mollis
          faucibus felis nec semper. Nulla at dapibus mauris. Vestibulum quis
          lorem accumsan, rhoncus velit quis, vestibulum metus. Phasellus
          feugiat risus ut fermentum tempus. Etiam vel turpis viverra, eleifend
          mi sed, semper odio. Nunc sed odio tempus, ultricies odio eu, aliquam
          mi.
        </Text>
        <Text style={styles.p}>
          Nulla lacinia metus bibendum lorem tempor, id commodo odio
          pellentesque. Donec a magna lacinia, tincidunt tortor at, tempus
          augue. Aenean vel mollis lorem. Nunc gravida purus ac orci lobortis,
          sit amet efficitur mauris vestibulum. Vestibulum auctor dui enim, et
          consectetur justo ultrices eget. Fusce nec nibh eu nisl egestas
          lacinia. Praesent non libero risus. In finibus ante sit amet
          condimentum euismod. Etiam in nulla quis urna laoreet finibus at non
          urna. Donec ac rutrum mi. Donec id ipsum dolor. Maecenas vehicula
          varius lectus eu commodo. Vestibulum faucibus nulla nec purus sodales,
          eget dictum orci scelerisque. Nulla elit tellus, efficitur nec
          volutpat vel, feugiat eget justo. Mauris mollis, odio at gravida
          gravida, leo felis vehicula ex, a venenatis nibh lectus et est.
        </Text>

        <WebView
          originWhitelist={['*']}
          bounces={true}
          scrollEnabled={false}
          source={{
            html: `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width,initial-scale=1">
                  </head>
                  <body>
                    <div id="habitat" data-rc-widget="" data-widget-host="habitat" data-widget-id="66621" data-endpoint="trends.revcontent.com"></div>
                    <script src="https://assets.revcontent.com/master/delivery.js" defer></script>
                  </body>
                </html>
              `
          }}
          onMessage={onMessage}
          injectedJavaScript={injectedJavaScript}
        />
        <Text style={styles.p}>
          Nulla lacinia metus bibendum lorem tempor, id commodo odio
          pellentesque. Donec a magna lacinia, tincidunt tortor at, tempus
          augue. Aenean vel mollis lorem. Nunc gravida purus ac orci lobortis,
          sit amet efficitur mauris vestibulum. Vestibulum auctor dui enim, et
          consectetur justo ultrices eget. Fusce nec nibh eu nisl egestas
          lacinia. Praesent non libero risus. In finibus ante sit amet
          condimentum euismod. Etiam in nulla quis urna laoreet finibus at non
          urna. Donec ac rutrum mi. Donec id ipsum dolor. Maecenas vehicula
          varius lectus eu commodo. Vestibulum faucibus nulla nec purus sodales,
          eget dictum orci scelerisque. Nulla elit tellus, efficitur nec
          volutpat vel, feugiat eget justo. Mauris mollis, odio at gravida
          gravida, leo felis vehicula ex, a venenatis nibh lectus et est.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 15
  },
  p: {
    paddingBottom: 10
  },
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center'
  },
  statusBar: {
    height: Constants.statusBarHeight,
    background: 'red'
  },
  webview: {
    flex: 0,
    height: 800
  }
});

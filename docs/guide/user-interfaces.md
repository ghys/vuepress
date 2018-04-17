# User Interfaces

## Initial Setup Package Selection

When starting openHAB for the very first time, you are asked to select an initial package to start with.

There are four packages to choose from, which will be explained here in detail.

*Note*: If you are doing a headless installation, you can also choose the package by setting the `package` parameter in `conf/services/addons.cfg` (resp. `/etc/openhab2/services/addons.cfg` for apt installations).

If you skipped the package installation, the system stays in a minimal setup without any add-ons which also means without any UIs. In such a case, you must configure the add-ons to install in `addons.cfg`.

### Standard Package (Recommended Setup)

![standard](./images/configuration/package_standard.jpg){:style="float: right;margin-left: 20px;margin-top: 7px;margin-bottom: 20px"}

This is the recommended package for the normal user. It contains the most common UIs and leaves the rest to the user to decide what else he needs.

This package thus installs:

- [Home Builder](homebuilder.html){:target="_blank"} as a getting-started generator for your home
- [Paper UI](../addons/uis/paper/readme.html){:target="_blank"} for system administration, including item access
- [Basic UI](../addons/uis/basic/readme.html){:target="_blank"} as the new modern web UI for mobile devices
- [HABPanel](../addons/uis/habpanel/readme.html){:target="_blank"} as a dashboard UI for (e.g. wall-mounted) tablets

Additional add-ons can be installed through Paper UI or directly by defining them in `addons.cfg`.

### Expert Package (Best for 1.x Users)

![expert](./images/configuration/package_expert.jpg){:style="float: right;margin-left: 20px;margin-top: 7px;margin-bottom: 20px"}

All users coming from openHAB 1.x should choose this package. It contains everything that was part of the core 1.x runtime, plus the tools that are specifically meant for power users.

This package thus installs:

- [Paper UI](../addons/uis/paper/readme.html){:target="_blank"} for system administration, including item access
- [Classic UI](../addons/uis/classic/readme.html){:target="_blank"} as the well-known web UI from openHAB 1.x
- [Basic UI](../addons/uis/basic/readme.html){:target="_blank"} as the new modern web UI for mobile devices
- [HABPanel](../addons/uis/habpanel/readme.html){:target="_blank"} as a dashboard UI for (e.g. wall-mounted) tablets
- [HABmin](../addons/uis/habmin/readme.html){:target="_blank"} as a powerful administration console, specifically suited for Z-Wave setups
- Interactive REST API that easily allows exploring the REST features through a documented UI
- all available transformations as they used to be part of the core 1.x runtime

### Simple Package (Purely UI)

![simple](./images/configuration/package_simple.jpg){:style="float: right;margin-left: 20px;margin-top: 7px;margin-bottom: 20px"}

This package contains only components that allow a fully UI-driven setup and configuration process.
These are:

- [Paper UI](../addons/uis/paper/readme.html){:target="_blank"} for system administration, configured with "simple linking", i.e. no items are exposed to the user
- the [new rule engine](rules-ng.html){:target="_blank"} to set up automation rules without scripting
- [HABPanel](../addons/uis/habpanel/readme.html){:target="_blank"} as a dashboard UI for daily use
- only "native" openHAB 2 bindings are available, 1.x add-ons are excluded

**WARNING**: Note that the UI-driven configuration features are new and still under development, so many features will be enhanced in upcoming versions.
Specifically the rule engine is in an early stage and has several functional limitations.
Most features of openHAB still require textual configuration (e.g. the sitemaps and complex rules).
This package therefore should only be used for very simple setups or as an demonstrator what there is to come.

### Demo Package (Sample Setup)

![demo](./images/configuration/package_demo.jpg){:style="float: right;margin-left: 20px;margin-top: 7px;margin-bottom: 20px"}

This package is suitable for demo purposes and for quickly checking out openHAB. It not only installs a few common bindings, but also defines sample textual configuration files, which are also used on the public [openHAB Demo Server](https://demo.openhab.org/){:target="_blank"}.

This includes:

- [Paper UI](../addons/uis/paper/readme.html){:target="_blank"} for system administration, configured in "simple" mode, such that newly added Things directly become available on the control UIs
- [Basic UI](../addons/uis/basic/readme.html){:target="_blank"} as the new modern web UI for mobile devices
- [HABPanel](../addons/uis/habpanel/readme.html){:target="_blank"} as a dashboard UI for tablets
- Bindings for Yahoo Weather, Belkin WeMo, Philips Hue, Sonos, IPP, Astro, AVM!Fritz and NTP
- RRD4j persistence service for storing time-series locally
- MAP transformation service as this is heavily used by the sample files
- Sample configurations files `demo.items`, `demo.things`,  `demo.sitemap`, `demo.rules`, `demo.script`, `rrd4j.persist`, `de.map` and `en.map` for use with the MAP transformation


## Home Builder

Boilerplate for the [Items](http://docs.openhab.org/configuration/items.html), [sitemap](http://docs.openhab.org/configuration/sitemaps.html) files and [HABPanel](http://docs.openhab.org/addons/uis/habpanel/readme.html) dashboard.

### Features

- Classifies the objects within each room and creates groups for them
- Optionally adds icons from [Classic Icon Set](http://docs.openhab.org/addons/iconsets/classic/readme.html) to the items
- Optionally adds Tags to the items - convenient for [HomeKit](http://docs.openhab.org/addons/io/homekit/readme.html)/[Hue Emulation](http://docs.openhab.org/addons/io/hueemulation/readme.html#device-tagging) add-ons users
- Automatically aligns the items vertically
- Generates a [Sitemap](http://docs.openhab.org/configuration/sitemaps.html) file
- Generates a set of HABPanel Dashboards corresponding with the Items

### Usage

#### Localization

Home Builder recognizes the locale by itself by simply checking your existing language configuration through openHAB's REST API.
All the Item's labels generated with Home Builder will be translated to the language of your choice.

#### Home Name

Provide your Home Name. It'll be a label for the `Home` Item, as well as the name of your Sitemap.
The `Home` item is the root item of your entire home structure - it contains all the floors as well as groups of Objects.

#### Floors

After that you can select the number of stories (floors) comprising the building.
Each floor will have its own `Group` Item - Ground Floor will be called `GF`, First Floor `FF` and so on.
If there's only one floor, no additional `Group` Items shall be created.

#### Rooms

Choose the rooms by simply selecting them on the list.
They contain the icons that you can adjust later.
If there's a custom room you'd like to add (e.g. a Piano room), provide its **label** to the field and hit Enter.
It will be added to the list.
The custom Item's **name** will be generated - e.g. for the "Piano Room" label the name would be `PianoRoom`

Note that the room doesn't appear on the Objects list right away - it's a known defect.
In order to add Objects to your custom room, simply remove the room from the list and re-add it again.

#### Objects

Objects are the devices or sensors that physically exist in the room.
They are represented in Home Builder as singular Items (e.g. Light, Window, Motion Sensor, Temperature etc.)
Each Object is added to the Items list with its corresponding type, label, icon and list of Groups.
E.g. `Light` Object in the Bedroom will appear as:

```java
Switch   Bedroom_Light    "Light"    <light>    (Bedroom, gLight)    {channel=""}
```

Note that the Objects have the `{channel=""}` prefilled for convenience.
You can turn it off with "Append channel to the non-Group items" option.

##### Custom Objects

You can use the existing Objects from the list, or create custom ones.
Simply typing the custom Object's label in the field will create it.
E.g. typing `Lamp` will result in:

```java
Switch   Bedroom_Lamp    "Lamp"    <none>    (Bedroom, gLamp)    {channel=""}
```

Note that the default type for your custom Item is `Switch`.
You can, however, change it by typing `{type}:{label}`, e.g. `Number:Pressure` so it appears as:

```java
Number   Bedroom_Pressure   "Pressure"    <none>    (Bedroom, gPressure)    {channel=""}
```

##### Grouping Objects

All Objects of the same kind are being grouped within Home Builder.
If you add a `Light` Object in bedroom, you'll see that there's an additional Item on the bottom:

```java
Group:Switch:OR(ON, OFF)   gLight    "Light"    <light>    (Home)
```

It doesn't matter if there's just one Object or dozens - they will be grouped within this `Group` Item.

### Items

You can choose to generate textual `*.items` file content or construct a request directly to the REST API that'll create the items for you.

### Sitemap

You can generate a simple sitemap with Home Builder too.
Sitemap name will be generated from "Home Setup Name" parameter that you've provided before.
Don't forget to save your sitemap with the correct file name.

Sitemaps generated with Home Builder contain a `Frame` for each floor.
Each one of those Frames contain corresponding rooms.

Last Frame inside the Sitemap is a list of Object's groups.

### HABPanel Dashboard

Home Builder will help you with creating your set of dashboards for [HABPanel](http://docs.openhab.org/addons/uis/habpanel/readme.html) too.
It creates a separate dashboard for each group of Objects.
All you need to do is to copy the generated JSON structure and paste it in HABPanel settings page.
The page is located in the following URL: `http://{youropenHAB:8080}/habpanel/index.html#/settings/localconfig`
Note that it'll override the existing Panel configuration!

## Paper UI

Please refer to the [Paper UI Addon documentation]({{docu}}/addons/uis/paper/readme.html).

The Paper UI is a new interface that helps setting up and configuring your openHAB instance.
It does not (yet) cover all aspects, so you still need to resort to textual configuration files, but it already offers the following:

-   Add-on management:
    Easily install or uninstall openHAB add-ons
    ![extensions](./images/configuration/paperui1.png)

-   Thing discovery:
    See devices and services found on your network and add them to your setup.
    ![discovery](./images/configuration/paperui2.png)

-   Linking items to channels:
    Instead of adding a binding configuration to your item file, you can directly link Thing channels to your items.
    ![links](./images/configuration/paperui3.png)

Note that you still need to define your items, sitemaps, persistence configurations and rules in the according config files (as done in openHAB 1). Such functionality will be added bit by bit to the Paper UI only.

Here you can find a small screencast about the Paper UI:

[![Paper UI](http://img.youtube.com/vi/MV2a5qwtmRE/0.jpg)](http://www.youtube.com/watch?v=MV2a5qwtmRE)

{% include contribution-wanted.html %}

## HABmin

HABmin is a modern, professional and portable user interface for openHAB,
providing both user and administrative functions (eg sitemaps for users, and configuration utilities
to aid setup).

Please refer to the [HABmin Addon documentation]({{docu}}/addons/uis/habmin/readme.html).

{% include contribution-wanted.html %}

## HABPanel

The [HABPanel]({{base}}/addons/ui/habpanel/readme.html) user interface is installed by default when choosing any initial setup package, and allows the creation of user-friendly dashboards, particularly suited for (e.g. wall-mounted) tablets. These dashboards can be designed interactively in the embedded designer, rather than using configuration files.

Despite being similar, HABPanel's dashboards and [sitemaps]({{base}}/configuration/sitemaps.html) are separate concepts, and can be designed independently as they aren't related to each other; however, they rely and act on [items]({{base}}/concepts/items.html) which must therefore be [defined]({{base}}/configuration/items.html) first. The [demo setup package]({{base}}/configuration/packages.html#demo-package-sample-setup), available for installation when starting openHAB for the first time, defines a series of sample items and configures HABPanel with a comprehensive set of dashboards to showcase a possible end result. It's the same as the one installed on the [openHAB Demo Server](https://demo.openhab.org/){:target="_blank"}, and it may be modified without risk of breaking anything: it's the best playground to discover HABPanel's features.

### Concepts

HABPanel has its own terminology of entities presented below:

![HABPanel concepts](./images/configuration/habpanel_concepts.png)

- The **Panel Registry** is the central storage used by HABPanel on a given openHAB instance, it contains several **Panel Configurations**;
- A **Panel Configuration** is a container holding a **Panel** along with its **Settings** and the definition of **Custom Widgets**. Each device HABPanel runs on (desktop browser, tablet...) has an active panel configuration and displays the panel associated with it;
- A **Panel** is a set of **Dashboards** (or pages) which can be presented to end users, who can also easily switch between them using the menu.
- A **Dashboard** is comprised of discrete **Widgets** positioned on the dashboard's surface at design time. There are several types of built-in *standard widgets*, configured separately, and the administrator can also develop (or import) *custom widgets*.

### About data persistence

By default, when running HABPanel on a new browser or device, a tutorial will be displayed allowing the user to start from scratch, or switch to an previously defined panel configuration. **Until a panel configuration is created (or chosen), HABPanel will run in "local storage" mode for this device: the settings will be retained in the browser's local storage only and nothing will be persisted on the server.** By contrast, when an active panel configuration is set, each change performed on the device will update the panel configuration on the server. This allows the sharing of panel configuration among devices, because other browsers and devices using this panel configuration will pick up the changes with a page refresh - this is useful for instance to design a panel comfortably on a computer, then use it on a tablet.

To switch from the local storage to a server-hosted panel configuration, go to the Settings page from the main menu or the side drawer (see below). A list of panel configurations will be presented in the _Current storage configuration_ section; if only the _"Local storage"_ option is available, click on the **Save the current configuration to a new panel configuration** link, give it a name to identify it (avoid spaces or special characters), and it should be added to the list. The radio button is also automatically checked, meaning it is now the active panel configuration.

Even when there is an active panel configuration, HABPanel uses the browser's storage to sync a locally-managed copy. With the **Edit the local panel configuration (experts only)** link under the _"Local storage"_ storage configuration option in the settings screen, the raw structure of the panel configuration can be inspected, modified, and exported or imported from/to a .json file. It is also an alternative way to backup, restore and share the configuration.

HABPanel uses service configuration variables to store its data on the openHAB server. They can be accessed using Paper UI (_Configuration > Services > UI > HABPanel > Configure_) or in the openHAB Karaf console:

```
openhab> config:edit org.openhab.habpanel
openhab> config:property-get <property>
```
The following properties are defined:

- `panelsRegistry`: contains the entire registry serialized in JSON, it is maintained by the application and shouldn't be modified directly (editing it by hand, while possible, is strongly discouraged);
- `lockEditing`: when enabled, all HABPanel instances will hide their editing features (a page refresh is necessary). When panels are complete and stable, it is advisable to turn on this setting so they cannot be easily modified by end users;
- `initialPanelConfig`: if this option is unset and no prior local configuration is detected, the tutorial will be displayed until some dashboards are added or a panel configuration is selected. This setting allows to bypass the tutorial and switch directly to the existing panel configuration with the given name.

### Major interface elements and features

#### The main menu

The main menu is HABPanel's home page. It contains tiles linking to the panel's dashboards, and an icon to switch between the run mode and the edit mode (if available).

![Main menu - run mode](./images/configuration/habpanel_main-menu-run.png)

Use the gears icon in the top-right corner to switch between the two modes.

![Main menu - edit mode](./images/configuration/habpanel_main-menu-edit.png)

When in edit mode, several features are available:
* Add a new empty dashboard with the **Add new dashboard** link;
* Go to the settings screen (for instance, to switch from local storage to a server-managed panel configuration) by clicking on the **Advanced settings** link;
* Adjust the number of columns for the grid of main menu tiles with the slider, from 1 (the default) to 6;
* Drag the arrow icons in the top-left corner of each tile to move it;
* Resize tiles with the chevron (triangle) in the bottom-right corner of each tile;
* Configure the tiles and the dashboards themselves with the gears icons in the top-right corner of each tile;
* Enter the dashboard designer by clicking inside a tile.

The configuration dialog when clicking on a tile's gear icon contains the following settings:

| Setting | Description
|---------|-------------|
| Name | The name of the dashboard, also displayed on the tile
| Background URL | The URL of a background image *for the main menu tile*
| Backdrop Icon | Iconset and icon displayed on the tile as a Backdrop
| Center backdrop horizontally | When unchecked, the backdrop is aligned to the right of the tile; when checked, it is centered
| Icon | Icon associated with the dashboard, currently only used in the side drawer
| Size (icon) | _(currently unused)_
| Title Text Color | Color for the name of the dashboard on the tile
| Advanced tab | Contains settings currently unstable or unsupported, for advanced users only
| Custom widgets tab | This [experimental feature](https://community.openhab.org/t/new-display-options-incl-experimental-custom-widgets-everywhere/34140/1) allows certain parts of a dashboard to be replaced by a custom widget (see _Custom Widgets_ below): the main menu tile, the drawer menu and the dashboard item - use with caution

It also contains a **Delete** button which will delete the entire dashboard and its contents - this happens immediately and cannot be undone!

#### The side drawer

![Side drawer](./images/configuration/habpanel_side-drawer.png)

The side drawer can be accessed from any screen by a swipe or drag to the right (on most elements where there isn't a conflict with this gesture), or with the "hamburger icon" ☰ in the top-left corner.

It is comprised of three parts:

1. A **header** - clicking on it returns to the main menu. Note: if defined, the title of the panel is displayed instead of the default "HABPanel" label, it is configured in the settings (see below);
2. A **list of dashboards** for quick switching between dashboards without going back to the main menu - they are presented in the order of the menu (sorted by row, then by column);
3. A **footer** displaying the current date & time and featuring a link to the settings screen (if available).

#### The dashboard designer

![Dashboard designer](./images/configuration/habpanel_dashboard-designer.png)

The dashboard designer is where widgets can be added, positioned, resized and configured. Placeholders are displayed where actual widgets would be on the running dashboard.

To add a widget, use the **Add widget** button and choose among the list of standard widgets, or eventual custom widgets in the panel configuration.
See below for a description of the standard widgets.

![Add widget menu](./images/configuration/habpanel_add-widget.png)

Use the header of a widget placeholder (with the four-arrow icon and the widget type) to move the widget. Moving a widget over other widgets do not push them away to make room (contrary to the main menu tiles), so ensure there is sufficient room for your widget before moving it.

![Widget placeholder features](./images/configuration/habpanel_dashboard-designer-placeholder-menu.png)

When hovering over a placeholder (or tapping inside it if on a touch interface), a chevron appears in the bottom-right corner allowing to resize it.

Use the ellipsis icon **⁝** to bring up the widget's contextual menu, offering the following options:

- **Edit...:** Displays the configuration dialog for the widget. The options available in the dialog depend on the type of the widget and are detailed in the Widgets section;
- **Copy/move to...**: Displays a dialog allowing to clone the widget with its configuration, to the current dashboard or another, or move it to another dashboard (the target widget will retain its size of the source widget but it will be placed where there is available room, use the target dashboard's designer to find it and reposition it);
- **Delete**: Deletes the widget.

Modifications to the dashboard are not saved automatically, use the **Save** button in the header to commit the changes to the panel configuration (or local storage). The **Run** button also saves, then runs the dashboard.

#### Running dashboards

![A running dashboard](./images/configuration/habpanel_running-dashboard.png)

When a dashboard is running, widgets can be interacted with, and server-sent events are received when items' states are updated, so widgets update automatically in HABPanel.

The icons in the top-right corner perform the following:
- the **speech balloon** activates the speech recognition feature and send the results as text to openHAB's default human language interpreter. This implies [some configuration on the server]({{base}}/configuration/multimedia.html#human-language-interpreter), and this icon might not be displayed if the browser doesn't support voice recognition ([mainly only in Chrome and other webkit variants currently](http://caniuse.com/#feat=speech-recognition){:target="_blank"}). It can also be configured in the panel configuration to appear on the bottom of the screen;
- the **refresh** button forces HABPanel to retrieve the current state of all items;
- the **fullscreen** button tells the browser to go fullscreen, if supported.

Tip: while running a dasboard, append `?kiosk=on` to the URL in the web browser to switch to "kiosk mode"; in this mode, the header, hamburger menu and toolbar will be hidden and the side drawer will be disabled - therefore there will be no easy way for an end user to switch to another screen (except with button widgets configured for that purpose). This mode is useful to display a full-screen, bare-bones UI for a fixed tablet.

### Additional features and settings

Apart from the storage configuration discussed above, the settings screen contains several settings kept as part of the panel configuration (meaning they are set separately):


| Setting | Description
|---------|-------------|
| Panel name | An user-friendly name for the panel. It will be displayed in the header of the side drawer.
| Theme | HABPanel comes with a number of built-in themes, with this setting a different theme may applied to the panel. Themes are not user-modifiable.
| Background image | Sets the specified URL as background image for the whole panel. *Tip: the background image works best with the 'translucent' theme!*
| Additional stylesheet | Reference the relative URL of an additional CSS file which will be included and can be used to override the styles defined by the theme. For additional information on how you can customize HABPanel's styles, go to: [HABPanel Development & Advanced Features: Start Here!](https://community.openhab.org/t/habpanel-development-advanced-features-start-here/30755/1)
| Drawer heading image | Reference the URL of an image (expected width: 265 pixels) which will replace the header in the side drawer
| Hide the drawer's footer | Check to remove the bottom black part of the side drawer containing the date & time
| Hide toolbar buttons (speak/refresh/fullscreen) | Check those boxes to hide the corresponding button in the default dashboard header top-right corner
| Show a clock in the header | If checked, a clock will be displayed in the main menu and the dashboards
| Header clock format (shown if "Show a clock in the header" is checked) | Use an [AngularJS' date filter format string](https://docs.angularjs.org/api/ng/filter/date) to customize the clock format in the header. The default is `HH:mm`
| Prevent scrolling (when not editing) | When enabled, it is impossible to scroll the dashboard on a tablet (and it prevents the "elastic" bouncing effect on iOS/Safari)
| Manage > (custom widgets) | Goes to the list of custom widget definitions for the active panel configuration
| Voice | Selects a voice from the detected list for text-to-speech*
| Speak the new value of the following item when it changes | When the selected String item change to a new text, HABPanel will use the browser's text-to-speech engine and the selected voice to read it aloud*
| Display a floating speech button at the bottom of the screen | Use an alternative style for the Speak (voice input) button in dashboards
| When this item changes to a dashboard's name, switch to it | This allows controlling the currently displayed dashboard by an openHAB item (useful with rules and as a side-effect to commands)

*Note: the text-to-speech functionality featured in HABPanel is unrelated to the [TTS services]({{base}}/configuration/multimedia.html#text-to-speech) defined on the openHAB server, and they are not compatible (this is why a String item is required and the `say()` function cannot be used). However, HABPanel will play audio streamed through the ['webaudio' sink]({{base}}/configuration/multimedia.html#audio), including spoken text.


### Widgets

#### Standard widgets

The following built-in widgets are available:

##### Dummy (dummy)

![Dummy widget](./images/configuration/habpanel_widget-dummy.png)

The so-called dummy widget (whose name is explained by historical reasons - it evolved from the first developed widget) displays the current state of an item without any interactivity, along with a label and an optional icon.

##### Switch (switch)

![Switch widget](./images/configuration/habpanel_widget-switch.png)

The switch widget is a simple widget to control a Switch item as defined in openHAB - it reports its state and is able to toggle it between ON and OFF.

##### Label (label)

![Label widget](./images/configuration/habpanel_widget-label.png)

The label widget is straightforward: it simply displays a fixed text and has a few appeareance options (color, font). It can for example be used as a header for a group of widgets below it.

##### Button (button)

![Button widget](./images/configuration/habpanel_widget-button.png)

The button widget can be clicked (or tapped) and will perform an action, like sending commands to an item or navigating to another dashboard. It can also adjust its colors depending on the state of the underlying item.

Multiple buttons are often used together to present different options for an item.

##### Slider (slider)

![Slider widget](./images/configuration/habpanel_widget-slider.png)

The slider widget can reflect the state of, and update, numerical items within a range of values. Several options are available to alter its appearance and behavior. 

##### Knob (knob)

![Knob widget](./images/configuration/habpanel_widget-knob.png)

The knob widget is similar in essence to the slider, but in a rotary fashion. It also offers extensive configurability over its appearance and behavior.

##### Selection (selection)

![Selection widget](./images/configuration/habpanel_widget-selection.png)

The selection widget displays the current state of an item, much like a dummy widget, except it opens a menu or a grid of automatically or manually configured choices for sending commands to this item. Various display options are available.

##### Color picker (colorpicker)

![Color picker widget](./images/configuration/habpanel_widget-colorpicker.png)

The color picker widget offers several ways of displaying and updating the state of an openHAB Color item (or group).

##### Image (image)

![Image widget](./images/configuration/habpanel_widget-image.png)

The image widget can display an image, directly or via an openHAB String item, and can refresh it at regular intervals.

##### Frame (frame)

![Frame widget](./images/configuration/habpanel_widget-frame.png)

The frame widget displays an external web page in a HTML `<iframe>`.

##### Clock (clock)

![Clock widget](./images/configuration/habpanel_widget-clock.png)

The clock widget displays an analog or digital clock. It can also be used to display the current date.

##### Chart (chart)

![Chart widget](./images/configuration/habpanel_widget-chart.png)

The chart widget can leverage openHAB persistence services to plot numerical series over a time period. It can also display server-generated chart images (default or rrd4j variants).

##### Timeline (timeline)

![Timeline widget](./images/configuration/habpanel_widget-timeline.png)

The timeline widget is the chart widget's counterpart for non-numerical items. It can display multiple "swimlanes" of items with color-coded slices representing their state changes during the selected period. Hovering or tapping inside a color slice displays details on the state of the item at the time.

##### Template (template)

The template widget allows an user-configured AngularJS HTML template to be rendered and hosted inside the widget boundaries; it exposes several helper functions and other facilities to retrieve and update openHAB's items from the template's markup.

With only a few web development skills required, you can easily start developing your own widgets and share them to community. It is nonetheless rather complex, so the best information has been compiled in this community wiki topic: [HABPanel Development & Advanced Features: Start Here!](https://community.openhab.org/t/habpanel-development-advanced-features-start-here/30755). You can also [learn by example in the forum's HABPanel category](https://community.openhab.org/c/apps-services/habpanel) or seek the help of the community.

Templates are defined inline, for each particular instance, and thus are not optimized for sharing and re-use. For those cases, developing a _custom widget_ is more appropriate.

#### Custom widgets

Custom widgets are similar to (and based on) the template widget but are designed to be reused, shared, and configured. A custom widget is an AngularJS template with an associated set of configuration settings. It can be added to dashboards and configured individually, like a built-in widget. Definitions of custom widgets are stored in the registry at the panel configuration level; this means they are specific to a panel configuration and each panel configuration has its own custom widgets (see the _Concepts_ section above).

For more information, please read the [community thread about this feature](https://community.openhab.org/t/custom-widgets-feature-walkthrough/16670/1).

##### Managing custom widgets

The list of custom widgets either via the dashboard designer (click/tap the gears icon in the _Add Widget_ dropdown menu), or with the _Manage_ button in the settings screen.

From the list, custom widgets can be created from scratch, or imported from a previously exported .json file or a GitHub repository. Members of the openHAB community also present their custom widgets on the forum: the _Get widgets from the openHAB community_ link brings up a filtered lists of custom widgets from the community.

Widgets can also come from [an openHAB addon or OSGi bundle](https://community.openhab.org/t/new-feature-globally-provisioned-widgets-i-e-with-osgi-bundles/26994): those are "globally-provisioned widgets". They cannot be modified or deleted (but can be cloned and then modified), and are available to all panel configurations. 

The context menu **⁝** can be used to perform operations on the widget: globally-provisioned widgets can only be cloned, and manually defined or imported widgets can be exported or deleted. Widgets imported from GitHub can also be updated and include a link to repository's Readme file.

##### The widget designer

Upon clicking on a custom widget definition, the widget designer opens. It contains three tabs:

- **Code:** This tab is an editor for the template's code. You can use the Ctrl-S (or Cmd-S) keyboard shortcut to save the widget while editing the code;

- **Settings:** This tab hosts the widget's general settings and configuration settings structure to be defined.
Click on the **Add setting** to add a new configuration setting. Each configuration setting must have a type, a technical ID, and other optional attributes. Each type of setting determines the UI element presented in the dashboard designer when configuring instances of the custom widget.
Use the arrow buttons to move configuration settings up or down, and the trash bin icon to remove them.
When instantiated, the value of configuration settings are set in the template's scope as `config.<setting_id>` (except those of type Icon which define an additional value, the iconset name, as `config.<setting_id>_iconset`);

- **Preview:** Upon switching to this tab, a test instance of the widget is rendered in an otherwise blank testbed dashboard. Use the sliders to resize the widget in order to preview it at different sizes. If it defines configuration settings, they must likely be set for this preview using the gears icon: this will bring up the widget instance's configuration dialog as it would appear in the dashboard designer.

Don't forget to save the changes with the **Save** button.



## Editors

Currently there are several existing solutions, that can help you configuring your openHAB instance in a textual way.
This documentation page can give you some guidance in choosing the right one for you and setting it up.

{::options toc_levels="2..4"/}

- TOC
{:toc}

#### Network Preparations

Any editors used to configure openHAB need to be able to access the configuration files on the remote openHAB host.

This can be achieved by using a [network share](https://en.wikipedia.org/wiki/Shared_resource) set up on the remote host and mounted on your local computer.
The steps required to set up a [network share](https://en.wikipedia.org/wiki/Shared_resource) on your local host computer are specific to the host operation system.
How to setup and use Samba on a Linux system is described in the [Linux article]({{base}}/installation/linux.html#network-sharing).
If you are using [openHABian]({{base}}/installation/openhabian.html), the network shares are readily configured for you, you only need to mount them locally.

*Attention Windows users:* Directly accessing network shares (UNC paths) is often not supported. Please be sure to mount the network share to a drive letter.

{: #openhab-vscode}
### openHAB VS Code Extension

openHAB VS Code is an extension for the [Visual Studio Code](https://code.visualstudio.com) editor.
You can find it in the [Microsoft Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=openhab.openhab).

  ![openHAB VS Code Extension demo](./images/configuration/vscode_demo.gif)

#### Installation

1. Install [Visual Studio Code](https://code.visualstudio.com/Download) on your desktop computer (not on the openHAB host)
2. Open the extension sidebar. ![openHAB VS Code Extension alternative installation](./images/configuration/vscode_extensiontab_icon.png)
3. Search for openHAB and install the extension.

[Visit the Extensions GitHub Page for further Informations](https://github.com/openhab/openhab-vscode/blob/master/README.md "GitHub Repo for the VS Code Extension")

#### Rule Validation

This extension has the ability to check rules and validate them through a so called `Language Server`.
(If you want to know more about this in general look [here](https://langserver.org/).)
The validation needs a running openHAB installation in your environment and can be activated with some simple steps.
You can find all important information in the extensions [readme file](https://github.com/openhab/openhab-vscode#validating-the-rules).

{: #others}
### Other Editor Integrations

The here summarized projects provide syntax highlighting for different text editors, but have no _on top_ functionality like the two tools above.

#### mcedit

mcedit is an editor which comes with mc (Midnight Commander).
You can find the syntax files and installation instructions on [openhab-mcedit](https://github.com/CWempe/openhab-mcedit).

{: #notepadpp}
#### Notepad++

Notepad++ is a free source code editor for Windows.
Version 6.2 or above is required.
You can find the syntax files on [openhab-samples](https://github.com/thefrip/openhab-samples) and install the files like it is described in the [editors documentation](http://docs.notepad-plus-plus.org/index.php/User_Defined_Language_Files#How_to_install_user_defined_language_files).

#### Vim

Vim is a text editor in Linux systems.
You can find the syntax file and installation instructions on [openhab-vim](https://github.com/cyberkov/openhab-vim).

#### Nano

Nano is a common editor in Linux systems.
You can find the syntax file and installation instructions on [openhabnano](https://github.com/airix1/openhabnano).

#### Textwrangler

Textwrangler is a text and code editor for MAC OS X.
You can find the syntax file and installation instructions on [openhab-syntax-textwrangler](https://github.com/GrisoMG/openhab-syntax-textwrangler).

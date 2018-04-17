# Administration

As a base technology openHAB uses [Apache Karaf](http://karaf.apache.org), a modern and polymorphic container able to host different kinds of applications.
The Karaf Console is a powerful tool to interact with the core of your openHAB installation.
Learn more about the advanced administrative capabilities of your openHAB installation in the sub-entries of this menu point.

## The Console

The console offers the option to:

* Monitor the [log](logging.html#karaf-console) in realtime
* Manage [bundles](bundles.html)
* Execute [runtime commands](runtime.html)

### Accessing the Console

The method to access the console depends on how openHAB was started.

* When started in interactive mode using the provided command line scripts (e.g. `start.sh` or `start.bat`), openHAB naturally transitions directly to the console prompt.
* When started as a service (i.e. when openHAB is running as a background process), access to the console is given by running the `$OPENHAB_RUNTIME/bin/client` (`client.bat` for Windows) script or by [connecting via SSH](#connecting-via-ssh).
Linux package based installations can also use the command `openhab-cli console`.

The default username/password is **openhab:habopen**, so enter `habopen` at the password prompt.

#### Connecting via SSH

The console can also be reached via secure shell connection ([SSH](https://en.wikipedia.org/wiki/Secure_Shell)).

To reach the console using SSH, use the following command to connect to the localhost interface on TCP port 8101:

```shell
ssh -p 8101 openhab@localhost
```

*Note:* By default, connection is only allowed from localhost, i.e. only from the machine running openHAB.
Connections are intentionally not allowed from remote hosts due to security concerns.
To change this, see [Bind Console to All Interfaces](#bind-console-to-all-interfaces).

A security warning is expected upon the first connection:

```text
The authenticity of host '[localhost]:8101 ([127.0.0.1]:8101)' can't be established.
RSA key fingerprint is SHA256:XjQxBPit+K5m3HuSsEUI/842NTCxLTu3EMGGBuQKNVg.
Are you sure you want to continue connecting (yes/no)?
```

Enter `yes` to proceed.

```text
Warning: Permanently added '[localhost]:8101' (RSA) to the list of known hosts.
Password authentication
Password:
```

The default username/password is **openhab:habopen**, so enter `habopen` at the password prompt.

The first successful connection triggers generation of the Karaf remote console key and will take a few seconds longer than subsequent attempts.

*Note:* On slower systems, such as Raspberry Pi or Pine64, this first SSH connection may even time out.
If this happens, simply try connecting again until successful.

### Using the Console

After successful connection and authentication, the console will appear:

```text
                          __  _____    ____
  ____  ____  ___  ____  / / / /   |  / __ )
 / __ \/ __ \/ _ \/ __ \/ /_/ / /| | / __  |
/ /_/ / /_/ /  __/ / / / __  / ___ |/ /_/ /
\____/ .___/\___/_/ /_/_/ /_/_/  |_/_____/
    /_/                        2.2.0
                               Release Build

Hit '<tab>' for a list of available commands
and '[cmd] --help' for help on a specific command.
Hit '<ctrl-d>' or type 'system:shutdown' or 'logout' to shutdown openHAB.

openhab>
```

The command `help` is listing all available commands or describes a specific subsystem/command:

```text
openhab> help
...
openhab> help bundle
...
openhab> help bundle:stop
...
```

The console also supports auto-completion during input.
Auto-completion proposes possible commands based on the current input and is triggered by a &lt;TAB&gt; press on your keyboard.
So for example entering "*bund*" and pressing the &lt;TAB&gt; key will first extend to the only viable candidate "bundle", a subsequent &lt;TAB&gt; press will result in:

```text
openhab> bundle
bundle                   bundle:capabilities      bundle:classes           bundle:diag              bundle:dynamic-import
bundle:find-class        bundle:headers           bundle:id                bundle:info              bundle:install
bundle:list              bundle:load-test         bundle:refresh           bundle:requirements      bundle:resolve
bundle:restart           bundle:services          bundle:start             bundle:start-level       bundle:stop
bundle:tree-show         bundle:uninstall         bundle:update            bundle:watch
```

Another useful feature is the combination of the `|` (pipe) and `grep` functionality, which can be used to filter output:

```text
openhab> bundle:list | grep openHAB
164 | Active    |  90 | 2.0.0.201607210102    | openHAB Core
165 | Active    |  80 | 2.0.0.201607210102    | openHAB Karaf Integration
195 | Active    |  80 | 2.0.0.201607210102    | openHAB 1.x Compatibility Layer
196 | Active    |  80 | 2.0.0.201607210102    | openHAB REST Documentation
```

The session is ended by using the logout command:

```text
openhab> logout
```

Learn about all available commands by using the initially introduced `help` command.

### Modifying the Console Settings

Changing the console password, interface, and port is described here.

#### Console Settings Files and Directories

The pertinent files controlling console settings are stored under `$OPENHAB_USERDATA/etc/`:

| File                         | Purpose                        |
|------------------------------|--------------------------------|
| `org.apache.karaf.shell.cfg` | Controls most console settings |
| `users.properties`           | Stores console password        |

The exact locations of these files will vary based on your platform and installation method, e.g. `/var/lib/openhab2/etc/` or `openhab2/userdata/etc/`.

Be aware that the these files may get overwritten when upgrading openHAB.
To add custom parameters or overwrite the default values, you can change the configuration file `runtime.cfg` which can be found in the `$OPENHAB_CONF/services` directory, e.g. `/etc/openhab2/services/runtime.cfg`.

#### Changing the Password

The password is stored in the file `users.properties`, located in the `etc` directory as [mentioned above](#console-settings-files-and-directories).
By default, the line with the password contains the text `openhab = `, followed by the current password (e.g. `habopen`) or a password hash (e.g. `{CRYPT}4AE1A0FD...{CRYPT}`).

To change the authentication password edit the file manually, replacing the password or password hash (including `{CRYPT}`) with your new password in clear text.
Alternately, run the following Linux shell command, which will perform the replacement for you.
Substitute `securePassword` with your desired password.

```shell
sudo sed -i -e "s/openhab = .*,/openhab = securePassword,/g" /var/lib/openhab2/etc/users.properties
```

Depending on your system, you may have to [change the directory](#console-settings-files-and-directories) at the end of the command.
Please restart openHAB for the changes to take effect. The clear text password will be replaced by a unique cryptographic password hash.

#### Bind Console to All Interfaces

The network interface configuration is defined in the file `org.apache.karaf.shell.cfg`, located in the `etc` directory as [mentioned above](#console-settings-files-and-directories).
As this file may get overwritten when upgrading openHAB, you can change this parameter in the `runtime.cfg` file which can be found in the `$OPENHAB_CONF/services` directory, e.g. `/etc/openhab2/services/runtime.cfg`.

The `sshHost` entry controls the interface address to bind to.
`sshHost = 127.0.0.1` (localhost) is the default due to obvious security reasons.
If you are on a local network or you are fully aware of all risks of exposing your system to the public, you can change the bind address.
Replace the `sshHost` IP `127.0.0.1` by `0.0.0.0` to bind to all available network interfaces.
Please be aware, that the console will now be accessible from all devices in your subnet and is only secured by the password defined in `users.properties` (same path).
You should thereby [change the password](#changing-the-password).
Depending on your network configuration the console may also be exposed to the public internet, so check your routing and firewall configuration.

To enable binding to all interfaces, uncomment the line

```#org.apache.karaf.shell:sshHost = 0.0.0.0```

in `services/runtime.cfg`.
 

#### Change the Port Number

The SSH port configuration is done through the file `org.apache.karaf.shell.cfg`, located in the `etc` directory as [mentioned above](#console-settings-files-and-directories).
The `sshPort` entry controls the port number.
`sshPort = 8101` is the default, but can be changed to any available port per your choosing.

Alternately, run the following Linux shell command, which will perform the replacement for you.
Substitute `1234` with your desired port number.
Depending on your system, you may have to substitute [the directory](#console-settings-files-and-directories) at the end of the command.

```shell
sudo sed -i -e "s/sshPort = .*/sshPort = 1234/g" /var/lib/openhab2/etc/org.apache.karaf.shell.cfg
```

----

Please check the [Apache Karaf reference](http://karaf.apache.org/manual/latest/) for more details.

## Runtime Commands

It is possible to query and even change the state of entities like items or things. Therefore the console offers commands in various areas:

{::options toc_levels="3..4"/}

* TOC
{:toc}

**Please note: Some of the described commands are executed on the internal database and could break your installation. Please use this functionality only if you know what you are doing!**


### Examples

Query an item's state:

```
openhab> smarthome:status Heating_GF_Corridor
OFF
```

Changing an item's state:

```
openhab> smarthome:send Heating_GF_Corridor ON
Command has been sent successfully.
```

Get help for a command:

```
openhab> help smarthome:send
Usage: smarthome:send <item> <command> - sends a command for an item
```

#### Items

| `smarthome:status <item>` | shows the current status of an item
| `smarthome:update <item> <state>` | sends a status update for an item
| `smarthome:send <item> <command>` | sends a command for an item
| `smarthome:items list [<pattern>]` | lists names and types of all items (matching the pattern, if given)
| `smarthome:items clear` | removes all items
| `smarthome:items remove <itemName>` | removes the given item

#### Discovery

| `smarthome:discovery start <thingTypeUID!bindingID>` | runs a discovery on a given thing type or binding
| `smarthome:discovery enableBackgroundDiscovery <PID>` | enables background discovery for the discovery service with the given PID
| `smarthome:discovery disableBackgroundDiscovery <PID>` | disables background discovery for the discovery service with the given PID

#### Inbox

| `smarthome:inbox` | lists all current inbox entries
| `smarthome:inbox listignored` | lists all ignored inbox entries
| `smarthome:inbox approve <thingUID> <label>` | creates a thing for an inbox entry
| `smarthome:inbox clear` | clears all current inbox entries
| `smarthome:inbox ignore <thingUID>` | ignores an inbox entry permanently

#### Things

| `smarthome:things list` | lists all things
| `smarthome:things clear` | removes all managed things

#### Links

| `smarthome:links list` | lists all links
| `smarthome:links addChannelLink <itemName> <channelUID>` | links an item with a channel
| `smarthome:links removeChannelLink <itemName> <thingUID>` | unlinks an item with a channel
| `smarthome:links clear` | removes all managed links

#### Audio

| `smarthome:audio play [<sink>] <filename>` | plays a sound file from the `conf/sounds` folder through the optionally specified audio sink(s)
| `smarthome:audio play <sink> <filename> <volume>` | plays a sound file from the `conf/sounds` folder through the specified audio sink(s) with the specified volume
| `smarthome:audio stream [<sink>] <url>` | streams the sound from the url through the optionally specified audio sink(s)
| `smarthome:audio sources` | lists the audio sources
| `smarthome:audio sinks` | lists the audio sinks

#### Voice

| `smarthome:voice say <text>` | speaks a text on the default audio sink with the default TTS and voice
| `smarthome:voice voices` | lists available voices of the active TTS services
| `smarthome:voice interpret <command>` | interprets a human language command

#### Automation

| `smarthome:> <script to execute>` | Executes a script from the `conf/scripts` folder

#### Firmware

| `smarthome:firmware list <thingTypeUID>` | Lists the available firmwares for a thing type.
| `smarthome:firmware status <thingUID>` | lists the firmware status for a thing
| `smarthome:firmware update <thingUID> <firmware version>` | updates the firmware for a thing

## Bundle Management

The [Karaf console](#console) offers various commands to manage bundles. Most of these commands are not needed in the normal (non-developer) use of openHAB. However some basic commands are needed when dealing with some expert user situations like testing a binding.

### List Bundles

The _bundle:list_ command returns a list of all currently installed bundles including their version.

```text
openhab> bundle:list
START LEVEL 100 , List Threshold: 50
 ID | State    | Lvl | Version               | Name
-----------------------------------------------------------------------------------------------------
 10 | Active   |  80 | 2.3.0.201506221200    | JAX-RS Gson Provider
 11 | Active   |  80 | 5.3.1.201602281253    | OSGi JAX-RS Connector
 12 | Active   |  80 | 2.3.1                 | Gson
 13 | Active   |  80 | 18.0.0                | Guava: Google Core Libraries for Java
 14 | Active   |  80 | 3.0.0.v201312141243   | Google Guice (No AOP)
...
209 | Active   |  80 | 2.0.0.b3              | Network Binding
```

### Start/Stop Bundles

Stoping a bundle is done with the command _stop_ and the ID of the bundle:

```text
openhab> bundle:stop 209
openhab> bundle:list
...
209 | Resolved |  80 | 2.0.0.b3              | Network Binding
```

The _start_ command works accordingly:

```text
openhab> bundle:start 209
openhab> bundle:list
...
209 | Active   |  80 | 2.0.0.b3              | Network Binding
```

### Naming Convention For Bundles

Bundles are named according to the following convention:

```text
<prefix>-<type>-<id>
```

where

- **prefix** is the first element to categorize the bundle.
  For addons this is often `openhab` or `esh`. 
- **type** is the add-on type, e.g. "binding" or "ui"
- **id** is the identifier for this bundle

The naming convention has many effects you may not have noticed before, but used already.
For example in the Paper UI the *sorted tabs* for all bindings are generated automatically based on the bundle naming.

In many places (e.g. logging) you will also have the **package namespace** as an identifier.
You can find it as the *Symbolic name* of the bundle with the following command:

```text
openhab> bundle:list -s
 ID | State    | Lvl | Version                | Name                        | Symbolic name
-----------------------------------------------------------------------------------------------------------------------
...
209 | Active   |  80 | 2.1.0                  | Network Binding             | org.openhab.binding.network
```

## Logging in openHAB

This article describes the logging functionality in openHAB 2.
Ths includes how to access logging information and configure logging for user-defined rules.

There are two ways to check log entries:

1. Through files stored on the **file system**
2. During runtime in the **Karaf Console**

### File System

Log files are written to either `userdata/log` (manual setup) or `/var/log/openhab2` (apt/deb-based setup) and can be accessed using standard OS tools for text files. The default installation of openHAB generates two log files:

- `events.log`
- `openhab.log`

### Karaf Console

The [Karaf console](console.html) allows to monitor the log in realtime.

The log shell comes with the following commands:

- `log:clear`: clear the log
- `log:display`: display the last log entries
- `log:exception-display`: display the last exception from the log
- `log:get`: show the log levels
- `log:set`: set the log levels
- `log:tail`: continuous display of the log entries

For example, following command enables the realtime monitoring of the default log:

```
openhab> log:tail
20:38:00.031 [DEBUG] [sistence.rrd4j.internal.RRD4jService] - Stored 'Temperature_FF_Child' with state '19.1' in rrd4j database
20:38:00.032 [DEBUG] [sistence.rrd4j.internal.RRD4jService] - Stored 'Temperature_FF_Bed' with state '19.5' in rrd4j database
20:38:20.463 [DEBUG] [thome.io.rest.core.item.ItemResource] - Received HTTP POST request at 'items/Light_FF_Bath_Ceiling' with value 'ON'.
20:38:21.444 [DEBUG] [thome.io.rest.core.item.ItemResource] - Received HTTP POST request at 'items/Light_FF_Bath_Mirror' with value 'ON'.
```

A useful functionality is that filters can be applied:

```
openhab> log:tail org.eclipse.smarthome.io.rest.core.item.ItemResource
20:36:52.879 [DEBUG] [thome.io.rest.core.item.ItemResource] - Received HTTP POST request at 'items/Light_FF_Bath_Ceiling' with value 'ON'.
20:36:53.545 [DEBUG] [thome.io.rest.core.item.ItemResource] - Received HTTP POST request at 'items/Light_FF_Bath_Ceiling' with value 'OFF'.
```

Please see the [Karaf documentation](http://karaf.apache.org/manual/latest/#_commands_2) for more examples and details.

### Config File

The config file for logging is `org.ops4j.pax.logging.cfg` located in the `userdata/etc` folder (manual setup) or in `/var/lib/openhab2/etc` (apt/deb-based setup).

### Defining what to log

In order to see the messages, logging needs to activated defining what should be logged and in which detail. This can be done in Karaf using the following console command:

```text
log:set LEVEL package.subpackage
```

The **what** is defined by `package.subpackage` and is in most cases a binding (like `org.openhab.binding.zwave`)

The **detail** of logging is defined by one of the following levels:

1. DEFAULT
2. OFF
3. ERROR
4. WARN
5. INFO
6. DEBUG
7. TRACE

The levels build a hierarchy with **ERROR** logging critical messages only and **DEBUG** logging nearly everything. **DEBUG** combineds all logs from levels 3 to 6, while **TRACE** adds further messages in addition to what **DEBUG** displays.
Setting the log level to **DEFAULT** will log to the level defined in the package.subpackage (in most cases a binding).

Following example sets the logging for the Z-Wave binding to **DEBUG**

```text
log:set DEBUG org.openhab.binding.zwave
```

Note that the log levels set using the `log:set` commands are not persistent and will be lost upon restart. To configure those in a persistent way, the commands have to be added to the [configuration file](#config-file).

### Create Log Entries in Rules

There are times, especially when troubleshooting rules, when it can be helpful to write information and variable or Item State values to the log.

For each log level there is an corresponding command for creating log entries.
You may use these log levels to filter or better differentiate the generated logging output.
The logging commands require two parameters: the subpackage, in the examples below `heating-control.rules`, and the text which should appear in the log:

```java
logError("heating-control.rules", "This is a log entry of type Error!")
logWarn("heating-control.rules", "This is a log entry of type Warn!")
logInfo("heating-control.rules", "This is a log entry of type Info!")
logDebug("heating-control.rules", "This is a log entry of type Debug!")
```

The main package of all script/rules based log entries is predefined as `org.eclipse.smarthome.model.script`.
The chosen subpackage is appended to the end of the main package.
It can be useful for filtering or package-based log level settings.

Examples for typical logging lines found in rules:

```text
logInfo("heating-control.rules", "Heating mode set to normal")
logError("heating-control.rules", "Heating control failed while in mode " + Heating_Mode.state)
logDebug("heating-control.rules", "Bedroom: Temperature: %1$.1f°C, Mode %2$s", Bedroom_Temp.state, Bedroom_Heater_Mode.state)
```

An example output of the last log statement above is:

```
2016-06-04 16:28:39.482 [DEBUG] [.e.model.script.heating-control.rules] Bedroom: Temperature 21.3°C, Mode NORMAL
```

Note that, in the last example above, inclusion and formatting of values is done using [Java Formatter String Syntax](https://docs.oracle.com/javase/7/docs/api/java/util/Formatter.html).

### Logging into Separate File

Per default all log entries are saved in the file `openhab.log` and event specific entries are saved in `events.log`. Additional files can be defined in order to write specifics logs to a separate place.

In order to create a new log file following two areas needs to be added to the [configuration file](#config-file):

**New logger:**

```java
## Logger - Demo.log
log4j.logger.org.eclipse.smarthome.model.script.Demo = DEBUG, Demo
```

**New file appender:**

```java
## File appender - Demo.log
log4j.appender.Demo=org.apache.log4j.RollingFileAppender
log4j.appender.Demo.layout=org.apache.log4j.PatternLayout
log4j.appender.Demo.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss.SSS} [%-5.5p] [%-36.36c] - %m%n
log4j.appender.Demo.file=${openhab.logdir}/Demo.log
log4j.appender.Demo.append=true
log4j.appender.Demo.maxFileSize=10MB
log4j.appender.Demo.maxBackupIndex=10
```

## JsonDB Storage

JsonDB provides a system database for storage of configuration data. All configuration data stored into the system through the REST interface that is used by the user interfaces will be stored into the JsonDB. JsonDB provides a high performance, human readable data store that is primarily meant for system use but can be edited manually, or stored in a version control system such as Git.

### Technical Overview

The system stores different data into separate tables. JsonDB maps these tables into separate files - in this way each file contains a different type of data (eg. Things, Items, Links).  The system also keeps a number of backups in a ```backup``` folder. Each time a file is updated, the current version will be moved to the ```backup``` folder and timestamped so that the system can retain the most recent files. By default the last 5 copies of each file are retained. When the system loads data from the file system, should it find that a file is corrupted it will attempt to open the most recent backup - it will try each backup in turn until a file is correctly read, or the number of files is reached.

To improve performance and reduce disk use all file writes are deferred for a few hundred milliseconds. This ensures that if there are multiple updates of the database in a short time, the system will only write these updates to the file system after the group of updates completes. If the system gets into a loop such that it is continually updating configuration information in the database, JsonDB will write a file every minute.  These timers can be configured by the user along with the number of backup files retained.

It is worth noting that data is only read from the file system when the table is first created - this is normally on system startup. After this the data is retained in memory and only written to file when there are changes.

### Manual Editing

Data is stored in a "pretty" format to make it more human readable, and is sorted so ordering is not random (important when a version control system is used). It is therefore editable by advanced users who might want to do a search and replace on item names etc.

If you manually edit the file you must take responsibility for ensuring it is correctly formatted. A Json format checker (such as jsonlin.com) can be used to check the format and this should ensure that the file can be correctly read. It doesn't however ensure that the correct format is used - users wanting to edit a specific table are advised to first configure the system with the UI and then use the format generated by the UI as a template for subsequent additions and changes. Most data stored in the database is written in a way that should be understandable by someone with good knowledge of the system.

As stated above, the files are only read during system startup - therefore if you change a file you will need to stop openHAB, make your changes and restart the system for the changes to take effect.

Example file -:

```

```

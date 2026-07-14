# Mobile Preview Quick Start

This guide explains how to preview SportX on a phone connected to the same trusted local network as your computer.

## 1. Start a local server

Open a terminal in the repository directory:

```powershell
cd <PROJECT_DIR>\sportx-oss-clean
python -m http.server 8080
```

Keep the terminal open while testing.

## 2. Find your computer's LAN address

On Windows PowerShell:

```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.PrefixOrigin -ne 'WellKnown' } | Select-Object IPAddress,InterfaceAlias
```

Use the address associated with the network shared by the phone and computer. Then open this URL on the phone:

```text
http://<YOUR_LAN_IP>:8080/
```

Use `http://`, not `https://`.

## 3. Troubleshooting

If the page does not load:

- Confirm both devices use the same trusted Wi-Fi network.
- Temporarily disable VPNs or proxies on the phone.
- Confirm `http://localhost:8080/` works on the computer.
- Check whether Windows Firewall is blocking inbound TCP port 8080.
- Avoid public Wi-Fi and do not configure router port forwarding.

If a firewall rule is required, create the narrowest rule suitable for your local environment and remove it after testing.

## 4. Stop the server

Return to the terminal and press `Ctrl+C`.

The Python server exposes the directory in which it is started and its descendants. Do not place credentials or private files inside the served directory.

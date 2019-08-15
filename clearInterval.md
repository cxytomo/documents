```
var t = setInterval(function() {
    (e = {
        source: 0,
        service_access_key: y.ics_secret_id,
        device_fingerprint: l.ics_client && l.ics_client.device_fingerprint,
        device_behaviors: l.ics_client && l.ics_client.device_behaviors
    }).device_behaviors && e.device_fingerprint && (i.send(JSON.stringify(e)),
    clearInterval(t))
}, 200)
```


# Server Structure

> [!TIP]
> Plug this mermaid markdown diagram into [https://mermaid.live/](https://mermaid.live/) or similar for an organized view

```mermaid
---
config:
  theme: dark
  layout: dagre
  look: neo
---
flowchart TB
 subgraph Services["Services"]
        MeiliSearch(["Meilisearch Service Port: 7700 meilisearch.com/docs/guides/deployment/running_production"])
        Strapi(["Strapi Service Port: 1337 strapi.io/integrations/aws"])
  end
 subgraph Reverse_Proxy["Reverse Proxy"]
        Nginx(["Nginx Reverse Proxy SSL: Certbot Domains: - meilisearch.- & server.-"])
        Certbot(["Certbot SSL Management"])
  end
 subgraph Network["Network Config"]
        DNS(["Squarespace DNS A records of meilisearch.- & server.- pointed to public IPv4 of AWS EC2"])
  end
 subgraph AWS_EC2["AWS EC2 Instance"]
    direction TB
        Services
        Reverse_Proxy
        Config_And_Logging
        Job_Scheduling
  end
 subgraph Config_And_Logging["Configuration and Logging"]
        ConfigFiles(["Nginx Config Files - /etc/nginx/sites-enabled/strapi - /etc/nginx/sites-enabled/meilisearch"])
        LogManagement(["Log Management Logs stored at /var/log/nginx/"])
  end
 subgraph Job_Scheduling["Scheduling"]
        CronJob(["Certbot Renewal Every 90 days"])
        EmailNotification(["Email Notifications to yhuang4@exeter_edu"])
  end
    DNS --> Nginx
    Nginx -- "meilisearch.theexonian.net" --> MeiliSearch
    Nginx -- "server.theexonian.net" --> Strapi
    Nginx -- Systemd Service 'nginx' --> Nginx
    Nginx --> Certbot & ConfigFiles
    Certbot -- SSL Renewal & Email Notification --> Nginx
    MeiliSearch -- Systemd Service 'meilisearch' --> MeiliSearch
    Strapi -- PM2 Process 'backend' --> Strapi
    ConfigFiles --> LogManagement
    Certbot --> CronJob
    CronJob --> EmailNotification
    EmailNotification -- Notify Admin --> Nginx
```

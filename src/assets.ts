export type AssetInterface = {
  readonly url:              string;
  readonly assets_url:       string;
  readonly upload_url:       string;
  readonly html_url:         string;
  readonly id:               number;
  readonly author:           Author;
  readonly node_id:          string;
  readonly tag_name:         string;
  readonly target_commitish: string;
  readonly name:             string;
  readonly draft:            boolean;
  readonly prerelease:       boolean;
  readonly created_at:       Date;
  readonly published_at:     Date;
  readonly assets:           readonly Asset[];
  readonly tarball_url:      string;
  readonly zipball_url:      string;
  readonly body:             string;
};

export type Asset = {
  readonly url:                  string;
  readonly id:                   number;
  readonly node_id:              string;
  readonly name:                 string;
  readonly label:                string;
  readonly uploader:             Author;
  readonly content_type:         string;
  readonly state:                string;
  readonly size:                 number;
  readonly download_count:       number;
  readonly created_at:           Date;
  readonly updated_at:           Date;
  readonly browser_download_url: string;
};

export type Author = {
  readonly login:               string;
  readonly id:                  number;
  readonly node_id:             string;
  readonly avatar_url:          string;
  readonly gravatar_id:         string;
  readonly url:                 string;
  readonly html_url:            string;
  readonly followers_url:       string;
  readonly following_url:       string;
  readonly gists_url:           string;
  readonly starred_url:         string;
  readonly subscriptions_url:   string;
  readonly organizations_url:   string;
  readonly repos_url:           string;
  readonly events_url:          string;
  readonly received_events_url: string;
  readonly type:                string;
  readonly site_admin:          boolean;
};

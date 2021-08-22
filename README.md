# actions/docker-alias

```yaml
steps:
  - uses: actions/checkout@v2
  - uses: masarakki/docker-alias@v2
    with:
      image: ruby:2.7
      commands: 'ruby,bundle,rake'
  - run: ruby --version
```

FROM debian:trixie

ENV container=docker
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
 && apt-get install -y --no-install-recommends systemd systemd-sysv dbus sudo openssh-server ca-certificates \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

RUN useradd --create-home --shell /bin/bash vagrant \
 && echo 'vagrant:vagrant' | chpasswd \
 && echo 'vagrant ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/vagrant \
 && chmod 0440 /etc/sudoers.d/vagrant \
 && mkdir --mode=700 /home/vagrant/.ssh

ADD https://raw.githubusercontent.com/hashicorp/vagrant/v2.4.1/keys/vagrant.pub /home/vagrant/.ssh/authorized_keys

RUN chmod 600 /home/vagrant/.ssh/authorized_keys \
 && chown -R vagrant:vagrant /home/vagrant/.ssh \
 && systemctl enable ssh

EXPOSE 22
STOPSIGNAL SIGRTMIN+3
CMD ["/lib/systemd/systemd"]

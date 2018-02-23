#!/bin/bash
MONGO_PWD=$1
#add mongo repo
cat > /etc/yum.repos.d/mongodb-org.repo << 'endmsg'
[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc

endmsg

yum repolist | grep 'mongodb'

yum install -y mongodb-org

systemctl enable mongod
systemctl start mongod
systemctl status mongod

#Check logs to see if waiting for connections
tail /var/log/mongodb/mongod.log | tail -1

# make a copy of the orig mongod.conf
cp /etc/mongod.conf /etc/mongod.conf.old

# Enable mongo auth
echo "
security:
   authorization: \"enabled\"" | tee -a /etc/mongod.conf

# Enable mongo for all interfaces
sed -i 's/.*bind/#  bind/' /etc/mongod.conf

# add the mongo admin user
mongo_statement="db.createUser({user:'admin', pwd:'${MONGO_PWD}',roles:['readWrite','dbAdmin']})"
mongo foodDB --eval "${mongo_statement}"

# refresh config from mongod.conf file
systemctl restart mongod

#selinux changes
#semanage port -a -t mongod_port_t -p tcp 27017
echo "Installation is complete, please test that you can connect to mongo by runnning the following:"
echo "mongo -u admin -p ${MONGOPWD} --authenticationDatabase foodDB --host 159.65.225.215:27017"
